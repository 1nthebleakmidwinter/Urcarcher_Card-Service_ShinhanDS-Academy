import ray

from dotenv import load_dotenv
load_dotenv()

from .realtime_exchange_rate import RealTimeExRateCrawler
from .realtime_config import CRAWLER_CONFIG
from .realtime_config import EXCHANGE_TYPES
from .realtime_config import PROCESS_BOUNDARY

if __name__ == "__main__" :
    # crawlers = [RealTimeExRateCrawler.remote(
    #                 CRAWLER_CONFIG['local'], EXCHANGE_TYPES, 
    #                 PROCESS_BOUNDARY[boundary]['from'], PROCESS_BOUNDARY[boundary]['until']
    #             ) for boundary in PROCESS_BOUNDARY.keys()]
    crawlers = [RealTimeExRateCrawler.remote(
                    CRAWLER_CONFIG['local'], EXCHANGE_TYPES, 
                    0, 58
                )]
    _ = ray.get([crawler.run.remote() for crawler in crawlers])