import os
import pymysql
import pandas as pd

from process.data import convert_to_date_format

class UrcarcherDBManager(object) :

    def __init__(self) :
        self._host = os.getenv("BACKEND_URL")
        self._user = os.getenv("DATABASE_CLIENT")
        self._password = os.getenv("DATABASE_CLIENT_PASSWORD")
        self._db = os.getenv("DATABASE")

        self._conn = pymysql.connect(host=self._host, user=self._user, password=self._password, db=self._db, charset='utf8')

    def update_db(
            self, 
            forecasted :pd.DataFrame, 
            exchange_type :str, 
    ) -> None :
        cur = self._conn.cursor()
        forecasted = forecasted.to_dict()

        sql = f"DELETE FROM forecasted_ex_rate_1yr WHERE exchange_type = '{exchange_type.split('_')[0]}'"
        cur.execute(sql)

        for n in range(len(forecasted['Date'])) :
            sql = f"INSERT INTO forecasted_ex_rate_1yr(forecast_id, forecasted_date, forecasted_open, forecasted_high, forecasted_low, forecasted_close, forecasted_change, exchange_type) VALUES('{convert_to_date_format(forecasted['Date'][n])}_{exchange_type.split('_')[0]}', '{convert_to_date_format(forecasted['Date'][n])}', '{forecasted['Open'][n]}', '{forecasted['High'][n]}', '{forecasted['Low'][n]}', '{forecasted['Price'][n]}', '{forecasted['Change %'][n]}', '{exchange_type.split('_')[0]}')"
            print(sql)
            cur.execute(sql)

        self._conn.commit()