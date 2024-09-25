import React, { useEffect, useState } from 'react';
import 'assets/rateGraph.css';
import 'components/exchange/ForecastedGraph.css';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';


import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import axios from 'axios';

const CustomXAxisTick = ({ x, y, payload, onClick, data }) => {
    const handleClick = () => {
        if (onClick) {
            // 기존
            // onClick(payload.value); // payload.value를 onClick에 전달
            
            // 추가
            // const selectedDate = payload.value; // 날짜
            // const selectedItem = data.find(item => item["날짜"] === selectedDate);
            // const openValue = selectedDate ? selectedItem["시가"] : "";
            // onClick({ date: selectedDate, open: openValue });
        }
    };

    return (
        <text
            x={x}
            y={y + 10}  // 텍스트 위치를 조정하여 겹침 방지
            fill="#666"
            textAnchor="middle"
            onClick={handleClick}
            style={{ fontSize: "11" }}>
            {payload.value}
        </text>
    );
};

function RateGraph( { getDate } ) {

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

    const [data, setData] = useState([]);
    const [currentPrice, setCurrentPrice] = useState('시가');
    const [exchangeType, setExchangeType] = useState('');

    const priceHandling = (e) => {
        setCurrentPrice(e.target.value);
    }

    const transport = (e) => {
        // console.log(e.currentTarget.dataset.date);
        getDate({ 
            date: e.currentTarget.dataset.date, 
            open: e.currentTarget.dataset.open
        });
    }

    useEffect(() => {

        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }


        axios.get("/api/fore/list", null)
            .then((resp) => {
                setExchangeType(resp.data[0].exchangeType);
                setData(resp.data.map((col, i) => {
                    return {
                        "날짜": col.forecastedDate.substring(0, 7),
                        "시가": col.forecastedOpen,
                        "종가": col.forecastedClose,
                        "고가": col.forecastedHigh,
                        "저가": col.forecastedLow,
                        "변동률": col.forecastedChange,
                        forecastedDate: col.forecastedDate,
                    };
                }));
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <div className="graph_wrapper">
                <LineChart className="lineChart_box" width={430} height={250} data={data}>
                    <CartesianGrid className="cartesianGrid_box" strokeDasharray="3" />
                    <XAxis
                        dataKey="날짜"
                        tickMargin={10} // tick과 label 간의 간격 조정
                        tick={<CustomXAxisTick />}
                    />
                    <YAxis
                        domain={[1270, 'auto']}
                        label={{
                            value: exchangeType ? `예상 환율(${exchangeType}/KRW)` : '',
                            angle: -90, // 회전 
                            position: 'insideLeft',
                            offset: 10,
                            dy: 40, // 높이
                            dx: -5 // 도메인과 간격
                        }}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey={currentPrice}
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>

                <div className="col-md-12 mb-3 gender">
                    <div className='forecast-price'>
                        <input
                            type="radio"
                            className="form-check-input"
                            value="시가"
                            checked={currentPrice === '시가'}
                            onChange={priceHandling}
                        />
                        <label>{t('openingPrice')}</label>
                        <input
                            type="radio"
                            className="form-check-input"
                            value="종가"
                            checked={currentPrice === '종가'}
                            onChange={priceHandling}
                        />
                        <label>{t('closingPrice')}</label>
                        <input
                            type="radio"
                            className="form-check-input"
                            value="고가"
                            checked={currentPrice === '고가'}
                            onChange={priceHandling}
                        />
                        <label>{t('highPrice')}</label>
                        <input
                            type="radio"
                            className="form-check-input"
                            value="저가"
                            checked={currentPrice === '저가'}
                            onChange={priceHandling}
                        />
                        <label>{t('lowPrice')}</label>
                        <input
                            type="radio"
                            className="form-check-input"
                            value="변동률"
                            checked={currentPrice === '변동률'}
                            onChange={priceHandling}
                        />
                        <label>{t('fluctuationRate')}{"(%)"}</label>
                    </div>
                </div>
            </div>

            {/* <div className='over-scroll'>
                <span>날짜</span>
                <span>시가</span>
                <span>종가</span>
                <span>고가</span>
                <span>저가</span>
                <span>변동률</span>
            </div> */}

            <div className='scroll-container'>
                <div className='scroll-area'>
                    <table>
                        <thead>
                            <tr>
                                <th>{t('date')}</th>
                                <th>{t('openingPrice')}</th>
                                <th>{t('closingPrice')}</th>
                                <th>{t('highPrice')}</th>
                                <th>{t('lowPrice')}</th>
                                <th>{t('fluctuationRate')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                            <tr key={index} onClick={transport} data-date={item.forecastedDate} data-open={item.시가} >
                                <td>{item.forecastedDate}</td>
                                <td>{item['시가']}</td>
                                <td>{item['종가']}</td>
                                <td>{item['고가']}</td>
                                <td>{item['저가']}</td>
                                <td>{item['변동률']}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default RateGraph;