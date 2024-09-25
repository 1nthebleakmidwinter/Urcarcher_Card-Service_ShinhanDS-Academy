import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import US from 'assets/icon-nation/icon-us.png';
import JP from 'assets/icon-nation/icon-jp.png';
import CN from 'assets/icon-nation/icon-cn.png';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';



function CurrencyRateList(props) {

    
    const { t, i18n } = useTranslation();
    const changeLanguage = (selectedLanguage) => {
    
    const languageMap = {
        Korea: 'ko',
        English: 'en',
        Japan: 'jp',
        China: 'cn'
    };

    const languageCode = languageMap[selectedLanguage] 
    i18n.changeLanguage(languageCode);
   
};



    const [exchangeRateInfos, setExchangeRateInfos] = useState({});
    const [socketData, setSocketData] = useState();
    const [date, setDate] = useState();
    const [standard, setStandard] = useState();
    const [round, setRound] = useState();

    const wss = useRef(null);

    useEffect(()=>{
        wsLogin();

        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }


    }, []);

    useEffect(()=>{
        if(socketData !== undefined) {
            let id = socketData.exchangeType;
            let datas = socketData;
            exchangeRateInfos[id] = datas;
            setDate(exchangeRateInfos[id].date);
            setStandard(exchangeRateInfos[id].standard);
            setRound(exchangeRateInfos[id].round);
            setExchangeRateInfos(exchangeRateInfos);
        }
    }, [socketData]);

    const wsLogin = useCallback(()=>{
        wss.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_SERVICE_URL);

        wss.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);
            setSocketData(dataSet);
        };
    });

    //환율 표시 국가
    const exchangeRates = [
        { country: t('USA'), currency: 'USD', symbol: '$', flag: US },  
        { country: t('Japan'), currency: 'JPY', symbol: '￥', flag: JP },
        { country: t('China'), currency: 'CNY', symbol: 'Y', flag: CN },
      ];
    
    return (
        <div>
           <ul className='home-rate-list'>
            {exchangeRates.map((rate, index) => (
                <li key={index}>
                <div>
                    <p className='country-txt'>
                        <span className='country'>
                            <img src={rate.flag} alt={rate.country} className='countryIcon' />
                             {rate.country} {rate.currency}
                        </span>
                    </p>
                </div>
                    {/* ?. : 연산자 앞 속성 null/undefined일 경우 속성에 접근 중단, .rate : 소켓에서 받아오는 환율 값 */}
                    <p className='rate-txt'>
                        KRW {exchangeRateInfos[rate.currency]?.rate || exchangeRateInfos.rate || '0'} 
                        <span style={{color:'#333'}}> = </span> 
                        1 {rate.symbol}
                    </p>
                </li>
            ))}
            </ul>
        </div>
    );
}

export default CurrencyRateList;