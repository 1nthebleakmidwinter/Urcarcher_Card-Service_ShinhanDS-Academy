import os

CRAWLER_CONFIG = {
    "local" : {
        "uri" : os.getenv("LOCAL_BACKEND_URI"),
        "is_ssl" : True
    },

    "backend_blue_1" : {
        "uri" : f"ws://{os.getenv('BACKEND_IP')}:{os.getenv('BACKEND_BLUE_PORT_1')}/realtime/rate",
        "is_ssl" : False
    },

    "backend_blue_2" : {
        "uri" : f"ws://{os.getenv('BACKEND_IP')}:{os.getenv('BACKEND_BLUE_PORT_2')}/realtime/rate",
        "is_ssl" : False
    },

    "backend_green_1" : {
        "uri" : f"ws://{os.getenv('BACKEND_IP')}:{os.getenv('BACKEND_GREEN_PORT_1')}/realtime/rate",
        "is_ssl" : False
    },

    "backend_green_2" : {
        "uri" : f"ws://{os.getenv('BACKEND_IP')}:{os.getenv('BACKEND_GREEN_PORT_2')}/realtime/rate",
        "is_ssl" : False
    }
}

EXCHANGE_TYPES = {
    "USD":'미국 USD', "EUR":'유럽연합 EUR', "JPY":'일본 JPY (100엔)', "CNY":'중국 CNY', "HKD":'홍콩 HKD', "TWD":'영국 TWD', "GBP":'영국 GBP', "OMR":'오만 OMR', "CAD":'캐나다 CAD', "CHF":'스위스 CHF', 
	"SEK":'스웨덴 SEK', "AUD":'호주 AUD', "NZD":'뉴질랜드 NZD', "CZK":'체코 CZK', "CLP":'칠레 CLP', "TRY":'튀르키예 TRY', "MNT":'몽골 MNT', "ILS":'이스라엘 ILS', "DKK":'덴마크 DKK', "NOK":'노르웨이 NOK', 
	"SAR":'사우디아라비아 SAR', "KWD":'쿠웨이트 KWD', "BHD":'바레인 BHD', "AED":'아랍에미리트 AED', "JOD":'요르단 JOD', "EGP":'이집트 EGP', "THB":'태국 THB', "SGD":'싱가포르 SGD', "MYR":'말레이시아 MYR', "IDR":'인도네시아 IDR 100', 
	"QAR":'카타르 QAR', "KZT":'카자흐스탄 KZT', "BND":'브루나이 BND', "INR":'인도 INR', "PKR":'파키스탄 PKR', "BDT":'방글라데시 BDT', "PHP":'필리핀 PHP', "MXN":'멕시코 MXN', "BRL":'브라질 BRL', "VND":'베트남 VND 100',
	"ZAR":'남아프리카 공화국 ZAR', "RUB":'러시아 RUB', "HUF":'헝가리 HUF', "PLN":'폴란드 PLN', "LKR":'스리랑카 LKR', "DZD":'알제리 DZD', "KES":'케냐 KES', "COP":'콜롬비아 COP', "TZS":'탄자니아 TZS', "NPR":'네팔 NPR',
	"RON":'루마니아 RON', "LYD":'리비아 LYD', "MOP":'마카오 MOP', "MMK":'미얀마 MMK', "ETB":'에티오피아 ETB', "UZS":'우즈베키스탄 UZS', "KHR":'캄보디아 KHR', "FJD":'피지 FJD'
}

PROCESS_BOUNDARY = {
    "first" : {
        "from" : 0,
        "until" : 19
    },

    "second" : {
        "from" : 19,
        "until" : 38
    },

    "third" : {
        "from" : 38,
        "until" : 58
    }
}