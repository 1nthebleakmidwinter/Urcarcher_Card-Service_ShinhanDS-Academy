import ray
import websockets
import ssl
import json

from bs4 import BeautifulSoup
from selenium import webdriver
from datetime import datetime

@ray.remote
class RealTimeExRateCrawler(object) :

    def __init__(self, crawler_config :dict, exchange_types :dict, exchange_from :int, exchange_until :int) :
        self._uri = crawler_config["uri"]
        self._is_ssl = crawler_config["is_ssl"]
        self._exchange_types = exchange_types
        self._exchange_from = exchange_from
        self._exchange_until = exchange_until
        self._columns = ["exchangeType", "country", "exchangeName", "rate", "buy", "sell", "give", "take", "date", "standard", "round", "change"]

        self._driver_options = webdriver.ChromeOptions()
        self._driver_options.add_argument("headless")
        self._driver_options.add_argument("--log-level=3")
        self._driver_options.add_argument("--disable-loging")
        self._driver_options.add_argument('--no-sandbox')
        self._driver_options.add_argument('--disable-dev-shm-usage')
        self._driver = webdriver.Chrome(options = self._driver_options)

        if self._is_ssl :
            self._ssl_context = ssl.SSLContext()
            self._ssl_context.check_hostname = False
            self._ssl_context.verify_mode = ssl.CERT_NONE

    async def run(self) :
        while True :
            try :
                await self._get_client()
            except Exception as e :
                print("websocket connection or crawling failed. Now driver & websocket connection initiating...")
                print(f"Exception : {e}")

    async def _send_last_realtime_rate_info(self, websocket) : 
        last_date = None

        while True :
            self._driver.get("https://finance.naver.com/marketindex/")
            soup = BeautifulSoup(self._driver.page_source, "html.parser")
            section = soup.find("div", {"id":"section_ex1"})

            date = self._clean_text(section.find("span", {"class":"date"}))
            date = datetime.strptime(date, '%Y.%m.%d %H:%M')

            if last_date :
                if str(last_date-date)[0] == '-' :
                    last_date = date
            else :
                last_date = date

            for ex_type in list(self._exchange_types.keys())[self._exchange_from:self._exchange_until] :
                self._driver.get(f"https://finance.naver.com/marketindex/exchangeDegreeCountQuote.naver?marketindexCd=FX_{ex_type}KRW")
                soup = BeautifulSoup(self._driver.page_source, "html.parser")

                temp = soup.find("tbody").find_next("tr")
                up_or_down = temp.attrs["class"][0]
                cols = temp.find_all("td")
                exchange_name = self._exchange_types[ex_type]

                ex_split = exchange_name.split(" ")

                data = {
                    self._columns[0] : ex_split[1] if not ex_split[1] == "공화국" else ex_split[-1],
                    self._columns[1] : ex_split[0] if not ex_split[1] == "공화국" else f"{ex_split[0]} {ex_split[1]}",
                    self._columns[2] : exchange_name,
                    self._columns[3] : self._clean_text(cols[1]),
                    self._columns[4] : self._clean_text(cols[3]),
                    self._columns[5] : self._clean_text(cols[4]),
                    self._columns[6] : self._clean_text(cols[5]),
                    self._columns[7] : self._clean_text(cols[6]),
                    self._columns[8] : str(last_date),
                    self._columns[9] : self._clean_text(section.find("span", {"class":"standard"})),
                    self._columns[10] : self._clean_text(cols[0]),
                    self._columns[11] : ('▲' if up_or_down == 'up' else '▼' if up_or_down == 'down' else '◆') + self._clean_text(cols[2])
                }

                data = json.dumps(data, ensure_ascii=False)

                await websocket.send(data)
                _ = await websocket.recv()

    async def _get_client(self) :
        if self._is_ssl :
            async with websockets.connect(self._uri, ssl=self._ssl_context) as websocket :
                await self._send_last_realtime_rate_info(websocket=websocket)
        else :
            async with websockets.connect(self._uri) as websocket :
                await self._send_last_realtime_rate_info(websocket=websocket)

    def _clean_text(self, soup :BeautifulSoup) :
        return soup.text.replace("\t", "").replace("\n", "")