import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/WeeklyChart.css';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';


const MonthlyChart = () => {

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


    const [selectedMonth, setSelectedMonth] = useState(() => {
        const today = new Date();
        return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
    });
    const [usage, setUsage] = useState([]);
    const [chartData, setChartData] = useState([['Category', 'Amount']]);
    const [categoryStats, setCategoryStats] = useState([]);
    const [memberId, setMemberId] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const categoryMapping = {
        "MT1": t('Convenience'),
        "CS2": t('Convenience'),
        "PK6": t('Convenience'),
        "OL7": t('Convenience'),
        "AD5": t('Convenience'),
        "PS3": t('Education/Culture'),
        "SC4": t('Education/Culture'),
        "AC5": t('Education/Culture'),
        "CT1": t('Education/Culture'),
        "SW8": t('Transportation'),
        "BK9": t('Finance/Public Services'),
        "AG2": t('Finance/Public Services'),
        "PO3": t('Finance/Public Services'),
        "FD6": t('Food/Health'),
        "CE7": t('Food/Health'),
        "HP8": t('Food/Health'),
        "PM9": t('Food/Health'),
        "AT4": t('Tourism/Leisure')
    };

    const categoryColors = {
        [t('Convenience')] : "#80B2FF",
        [t('Education/Culture')]: "#FF80EB",
        [t('Transportation')]: "#FFCC80",
        [t('Finance/Public Services')]: "#FF808F",
        [t('Food/Health')]: "#80FF94",
        [t('Tourism/Leisure')]: "#FF99CC",
    };

    const categoryImages = {
        [t('Convenience')]: require('../../assets/conv.png'),
        [t('Education/Culture')]: require('../../assets/education.png'),
        [t('Transportation')]: require('../../assets/bus.png'),
        [t('Finance/Public Services')]: require('../../assets/etc.png'),
        [t('Food/Health')]: require('../../assets/food.png'),
        [t('Tourism/Leisure')]: require('../../assets/travel.png'),
    };

    useEffect(() => {

        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }


        axios.get('/api/t/test')
            .then(response => {
                const memberData = response.data;
                setMemberId(memberData.memberId);

                console.log('멤버아디', memberData.memberId);

                // memberId를 사용하여 결제 데이터 가져오기
                axios.post('/api/payment/by-member', { memberId: memberData.memberId })
                    .then(paymentResponse => {
                        console.log('Payment data:', paymentResponse.data); // 로그 추가
                        setUsage(paymentResponse.data);
                        filterDataByMonth(selectedMonth, paymentResponse.data); // 초기 데이터 필터링
                    })
                    .catch(paymentError => {
                        console.error('Error fetching payment data:', paymentError.response || paymentError.message);
                        // 에러 상태 처리
                    });
            })
            .catch(error => {
                console.error('Error fetching member data:', error);
                // 에러 상태 처리
            });
    }, []);

    useEffect(() => {
        if (usage.length > 0) {
            filterDataByMonth(selectedMonth, usage); // 선택된 달에 따라 데이터 필터링
        }
    }, [selectedMonth]);

    const filterDataByMonth = (month, data) => {
        const filtered = data.filter(item => {
            const itemMonth = new Date(item.paymentDate).toISOString().split('T')[0].substring(0, 7);
            return itemMonth === month;
        });
        generateChartData(filtered);
    };

    const generateChartData = (data) => {
        const categoryTotals = {};
        let totalAmount = 0;

        // 모든 카테고리를 0으로 초기화
        Object.keys(categoryMapping).forEach((code) => {
            const category = categoryMapping[code];
            if (!categoryTotals[category]) {
                categoryTotals[category] = 0;
            }
        });

        // 실제 데이터를 반영하여 금액을 집계
        data.forEach(item => {
            const category = categoryMapping[item.categoryCode];
            if (category) {  // "기타" 카테고리 제외
                categoryTotals[category] += item.paymentPrice;
                totalAmount += item.paymentPrice;
            }
        });

        const formattedChartData = [['Category', 'Amount']];
        let stats = [];

        for (const [category, amount] of Object.entries(categoryTotals)) {
            const percentage = totalAmount > 0 ? Math.round((amount / totalAmount) * 100) : 0;
            formattedChartData.push([category, amount]);
            stats.push({ category, amount, percentage });
        }

        // 퍼센트 높은 순서대로 정렬
        stats.sort((a, b) => b.percentage - a.percentage);

        setChartData(formattedChartData);
        setCategoryStats(stats);
    };

    const handleMonthChange = (event) => {
        const month = event.target.value;
        const today = new Date();
        const yearMonth = `${today.getFullYear()}-${month}`;
        setSelectedMonth(yearMonth);
    };

    const generateMonthOptions = () => {
        const options = [];
        for (let month = 1; month <= 12; month++) {
            const value = month.toString().padStart(2, '0');
            options.push(<option key={value} value={value}>{month}{t('Month')}</option>);
        }
        return options;
    };

    const slices = categoryStats.map((stat, index) => ({
        color: categoryColors[stat.category] || categoryColors['기타']
    }));

    return (
        <div className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
            <div className="header-menu" >
                <div
                    className={`menu-item ${location.pathname === '/chart2' ? 'active' : ''}`}
                    onClick={() => navigate('/chart2')}
                >
                    {t('ConsumptionReport')}
                </div>
                <div
                    className={`menu-item ${location.pathname === '/chart1' ? 'active' : ''}`}
                    onClick={() => navigate('/chart1')}
                >
                    {t('ConsumptionPatternAnalysis')}
                </div>
            </div>

            <div style={{ marginTop: '20px' }}>
                <div style={{ fontSize: '20px', justifyContent: 'flex-start', display: 'flex', marginLeft: '20px', fontWeight: 'bolder' }}>
                    <select
                        value={selectedMonth.split('-')[1]}
                        onChange={handleMonthChange}
                        style={{ border: 'none', outline: 'none', fontWeight: 'bold' }}
                    >
                        {generateMonthOptions()}
                    </select>
                    &nbsp;{t('ConsumptionPatternAnalysis')}
                </div>

                <div className="chart-container">
                    <Chart
                        chartType="PieChart"
                        data={chartData}
                        options={{
                            pieHole: 0.4,
                            tooltip: { text: 'percentage' },
                            pieSliceText: 'percentage',
                            slices: slices
                        }}
                        width="480px"
                        height="350px"
                    // legendToggle
                    />
                </div>

                {categoryStats.length > 0 ? (
                    categoryStats.map((stat, index) => (
                        <div
                            key={index}
                            style={{
                                margin: index === 0 ? '0px 10px' : '25px 10px', // 첫 번째 요소에만 '0px 10px' 적용
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <img src={categoryImages[stat.category]} alt={stat.category} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                            <div style={{ flex: 1, textAlign: 'left', fontWeight: 'bold' }}><strong>{stat.category}</strong></div>
                            <div style={{ fontWeight: 'bold', textAlign: 'right', marginLeft: 'auto' }}>{stat.amount.toLocaleString()}{" "+t('Won')}&nbsp; | &nbsp; {stat.percentage}%</div>
                        </div>
                    ))
                ) : (
                    <div>{t('NoCategoryInformation')}</div>
                )}
            </div>
        </div>
    );
};

export default MonthlyChart;
