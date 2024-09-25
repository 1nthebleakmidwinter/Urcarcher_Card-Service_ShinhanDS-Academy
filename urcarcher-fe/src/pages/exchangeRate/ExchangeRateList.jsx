import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'pages/exchangeRate/ExchangeRateList.css';
import LoadingSpinner from "components/LoadingSpinner";
import reading from "assets/reading.png";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';

import { flagImg } from './FlagImg.js'; // 국가 별 이미지

function ExchangeRateList(props) {

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

    const searchHandler = (e) => {
        setSearchWord(e.target.value);
    };

    const resetSearchList = () => {
        setSearchList({});
    };

    const [exchangeRateInfos, setExchangeRateInfos] = useState({});
    const [socketData, setSocketData] = useState();
    const [loading, setLoading] = useState(true);
    const [searchWord, setSearchWord] = useState('');
    const [searchList, setSearchList] = useState({});

    const wss = useRef(null);
    const mainlist = ['USD', 'EUR', 'JPY', 'CNY']

    useEffect(() => {

        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }

        wsLogin();
    }, []);

    useEffect(() => {
        if (socketData !== undefined) {
            let id = socketData.exchangeType;
            let datas = socketData;
            exchangeRateInfos[id] = datas;
            setExchangeRateInfos(exchangeRateInfos);
            
            if(Object.keys(exchangeRateInfos).length == 58) {
                setLoading(false);
            }
        }
    }, [socketData]);

    useEffect(()=> {
        let temp = {};
        Object.keys(exchangeRateInfos).map((item)=>{
            if(t(exchangeRateInfos[item].country).includes(searchWord)) {
                temp[item] = exchangeRateInfos[item];
            }
        });

        setSearchList({...searchList, ...temp});
    }, [searchWord]);

    const wsLogin = useCallback(() => {
        wss.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_SERVICE_URL);

        wss.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);
            setSocketData(dataSet);
        };
    });
   
    if(loading) return <LoadingSpinner />;

    return (
        <div className='contents'>
            <div className='realtime'>
                <div className='mainlist-article'>
                    <ul className='mainlist-list'>
                        {mainlist.map((item, index)=>(
                        <li key={index}>
                            <div className='flag_img_wrapper'>
                                <img className='flag_img' src={t(flagImg(exchangeRateInfos[item].exchangeType))} alt='국기'/>
                                <p className='mainlist-itemname'>{exchangeRateInfos[item] ? 
                                    `${t(exchangeRateInfos[item].country)} ${exchangeRateInfos[item].exchangeType}` : ''}
                                </p>
                            </div>
                            <div className='mainlist_text_wrapper'>
                                <p className='mainlist-itemprice'>{exchangeRateInfos[item] ? exchangeRateInfos[item].rate : ''}</p>
                            </div>
                            <div>
                                <p className='mainlist-itemtime'>{exchangeRateInfos[item] ? exchangeRateInfos[item].date : ''}</p>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
    
                <div className="mainlist-search-box">
                    <img className="reading" src={reading}/>
                    <input placeholder={"국가 검색"} id="search" name="search" autoComplete="off" className='mainlist-text-box' onChange={searchHandler} onKeyDown={resetSearchList}/>
                </div>
                {/* <hr/> */}
                <div className='tableArea'>
                    <table>
                        <tbody>
                            {Object.keys(searchWord ? searchList : exchangeRateInfos).map((item)=>(
                            <tr key={item}>
                                <td>
                                    <div className='table_flag_img_wrapper'>
                                        <div className='table_flag_img_box'>
                                            <img className='table_flag_img' src={t(flagImg(exchangeRateInfos[item].exchangeType))} alt='국기'/>
                                        </div>
                                        <p className='tableName'>
                                            {exchangeRateInfos[item] ? 
                                            `${t(exchangeRateInfos[item].country)} ${exchangeRateInfos[item].exchangeType}` : ''}
                                        </p>
                                    </div>
                                    <p className='tableTime'>
                                        {exchangeRateInfos[item] ? exchangeRateInfos[item].date : ''}
                                    </p>
                                </td>
    
                                <td>
                                    {exchangeRateInfos[item] ? exchangeRateInfos[item].rate : ''}
                                </td>
    
                                <td>
                                    <div className='standard-round'>
                                        <span className='standard-round-box' style={{color: exchangeRateInfos[item].change.substring(0, 1) == '▲' ? 'red' : exchangeRateInfos[item].change.substring(0, 1) == '▼' ? 'blue' : 'black'}}>
                                            {/* {exchangeRateInfos[item] ? `${exchangeRateInfos[item].round}차 ${exchangeRateInfos[item].standard}` : ''} */}
                                            {/* 회차에서 변동률로 변경 */}
                                            {exchangeRateInfos[item] ? exchangeRateInfos[item].change : ''}
                                        </span>
                                        {/* <span>{exRate(exchangeRateInfos[item].rate, exchangeRateInfos[item].exchangeType)}</span> */}
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default ExchangeRateList;