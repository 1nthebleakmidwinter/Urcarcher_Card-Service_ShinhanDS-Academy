import pandas as pd
import numpy as np

from bs4 import BeautifulSoup
from selenium import webdriver
from datetime import datetime, timedelta
from sklearn.preprocessing import StandardScaler

from process.updater_config import *
from process.model_config import *

COLUMNS_MATCHING = {"Price":0, "Open":1, "High":2, "Low":3}

class DataUpdater(object) :

    def __init__(self, exchange_rate_list :list) -> None :
        self._exchange_rate_list = exchange_rate_list
        self._from_api_to_origin_path = DATA_PATH
        self._targets = [pd.read_csv(self._get_csv_path(exchange_rate)) for exchange_rate in self._exchange_rate_list]

        self._driver_options = webdriver.ChromeOptions()
        self._driver_options.add_argument("headless")
        self._driver_options.add_argument("--log-level=3")
        self._driver_options.add_argument("--disable-loging")
        self._driver_options.add_argument('--no-sandbox')
        self._driver_options.add_argument('--disable-dev-shm-usage')
        self._driver = webdriver.Chrome(options = self._driver_options)

    def save(self) -> None :
        for i, exchange_rate in enumerate(self._exchange_rate_list) :
            self._targets[i].to_csv(self._get_csv_path(exchange_rate), index = False)
    
    def update(self) -> str :
        for i, exchange_rate in enumerate(self._exchange_rate_list) :
            new_data = {'Date':[], 'Price':[], 'Open':[], 'High':[], 'Low':[], 'Change %':[]}
            self._driver.get(f"https://www.investing.com/currencies/{exchange_rate.replace('_','-').lower()}-historical-data")
            soup = BeautifulSoup(self._driver.page_source, "html.parser")
            rows = soup.find("div", {"class":"mt-6 flex flex-col items-start overflow-x-auto p-0 md:pl-1"}).find("tbody").find_all("tr")

            for row in rows[2:]:
                cols = row.find_all("td")
                new_data['Date'].append(self._convert_date(cols[0].find("time").text))
                new_data['Price'].append(cols[1].text.replace(',',''))
                new_data['Open'].append(cols[2].text.replace(',',''))
                new_data['High'].append(cols[3].text.replace(',',''))
                new_data['Low'].append(cols[4].text.replace(',',''))
                new_data['Change %'].append(self._convert_change(cols[6].text))

            for key in new_data.keys() :
                new_data[key].reverse()
            
            if exchange_rate == "JPY_KRW" :
                new_data = self._JPY_to_JPY100(pd.DataFrame(new_data))
            else : new_data = pd.DataFrame(new_data)

            point = new_data.index[(new_data['Date'] == self._targets[i].tail(n=1).iloc[0, 0])].array[0]
            self._simple_concat(i, self._targets[i], new_data[point+1:])

            print(exchange_rate, self._targets[i])

        return "data update success."

    def get_targets(self) -> pd.DataFrame :
        return self._targets

    def _simple_concat(
            self, index :int, target :pd.DataFrame, new_data :pd.DataFrame
    ) :
        self._targets[index] = pd.concat([
            target,
            new_data
        ])
        return self

    def _drop_vol(self, index :int) :
        self._targets[index] = self._targets[index].drop(columns="Vol.")
        return self

    def _get_rid_of_percentage(self, index :int) :
        self._targets[index]["Change %"] = self._targets[index]["Change %"].apply(lambda x: x[:-1]).astype({"Change %":"float64"})
        return self

    def _reverse_rows(self, index :int) :
        self._targets[index] = self._targets[index].loc[::-1].reset_index(drop=True)
        return self

    def _JPY_to_JPY100(self, new_data :pd.DataFrame) -> pd.DataFrame :
        for column in ["Price", "Open", "High", "Low"] :
            new_data[column] = new_data[column].astype(float)*100
        return new_data

    def _get_csv_path(self, exchange_rate :str) -> str :
        return f"{self._from_api_to_origin_path}/{exchange_rate}.csv"

    def _convert_date(self, date :str) -> str :
        return date.replace(date[:3], INVESTING_MONTH_MATCHING[date[:3]]).replace(',','').replace(' ','/')

    def _convert_change(self, change :str) -> str :
        return change[1:].replace('%','') if change[0] == '+' else change.replace('%','')



def convert_to_date_format(date :str) -> str :
    split_date = date.split("/")
    split_date.insert(0, split_date.pop(-1))
    return '-'.join(split_date)

def convert_to_csv_date_format(date :str) -> str :
    split_date = date.split("-")
    split_date.append(split_date.pop(0))
    return '/'.join(split_date)

def get_next_1yr() -> pd.DataFrame :
    new_data = {'Date':[]}
    today = datetime.now()

    for n in range(1, 365) :
        next_day = today + timedelta(days=n)
        if next_day.date().isoweekday() > 5 : continue

        new_data["Date"].append(convert_to_csv_date_format(str(next_day.date())))
        if len(new_data["Date"]) == 260 : break
    
    return pd.DataFrame(new_data)



class DataProcessor(object) :

    def __init__(
            self, train_by :str, 
            predict_target :str, 
            train_ratio :int,
            seq_len :int,
            pred_days :int,
            windows :int
    ) -> None :
        self._history = pd.read_csv(f"{HISTORY_PATH}/{train_by}.csv")

        self._seq_len = seq_len
        self._pred_days = pred_days
        self._windows = windows
        
        self._predict_target = predict_target
        self._y_true = self._history[predict_target].values
        self._dates = pd.to_datetime(self._history["Date"])
        self._historical_data = self._history[COLUMNS[1:]].astype(float)
        self._historical_data_scaled = None

        self._n_train = int(train_ratio * self._historical_data.shape[0])
        self._train_data_scaled = None
        self._train_dates = None

        self._test_data_scaled = None
        self._test_dates = None

        self._scaler = StandardScaler()

    def scaling(self) :
        self._scaler = self._scaler.fit(self._historical_data)
        self._historical_data_scaled = self._scaler.transform(self._historical_data)

        return self
    
    def set_train_test_data(self) :
        self._train_data_scaled = self._historical_data_scaled[:self._n_train]
        self._train_dates = self._dates[:self._n_train]

        self._test_data_scaled = self._historical_data_scaled[self._n_train:]
        self._test_dates = self._dates[self._n_train:]

        return self
    
    def get_data_set_by_sliding_window(self) -> list[np.ndarray] :
        
        trainX, trainY, testX, testY = [], [], [], []

        for i in range(self._seq_len, self._n_train-self._pred_days, self._windows):
            trainX.append(self._train_data_scaled[i-self._seq_len:i, COLUMNS_MATCHING[self._predict_target]])
            trainY.append(self._train_data_scaled[i:i+self._pred_days, COLUMNS_MATCHING[self._predict_target]])

        for i in range(self._seq_len, len(self._test_data_scaled)-self._pred_days+1, self._windows) :
            testX.append(self._test_data_scaled[i-self._seq_len:i, COLUMNS_MATCHING[self._predict_target]])
            testY.append(self._test_data_scaled[i:i+self._pred_days, COLUMNS_MATCHING[self._predict_target]])

        return [np.array(trainX), np.array(trainY), np.array(testX), np.array(testY)]

    def get_data_set_for_predict(self) -> np.ndarray :
        testX = []
        testX.append(self._train_data_scaled[self._n_train-self._seq_len:self._n_train, COLUMNS_MATCHING[self._predict_target]])
        
        return np.array(testX)
    
    def get_scaler(self) -> StandardScaler :
        return self._scaler