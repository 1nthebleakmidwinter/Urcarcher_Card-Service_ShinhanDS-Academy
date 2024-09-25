import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import '../../assets/WeeklyChart.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';




const options = {
  title: "",
  hAxis: {
    gridlines: { color: 'transparent' },
    baselineColor: 'transparent'
  },
  vAxis: {
    gridlines: { color: 'transparent' },
    baselineColor: 'transparent',
    textPosition: 'none'
  },
  legend: "none",
  bar: { groupWidth: "80%" },
  isStacked: true,
  animation: {
    startup: true,
    easing: 'inAndOut',
    duration: 1000,
  },
  chartArea: {
    width: '90%',
    height: '70%',
    left: '5%' // 차트를 왼쪽으로 이동
  },
  annotations: {
    alwaysOutside: true,
    textStyle: {
      fontSize: 14,
      auraColor: 'none',
      color: '#000'
    },
    stem: {
      color: 'transparent'
    }
  }
};

const getWeekOfMonth = (date) => {

  

  

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return Math.ceil((date.getDate() + firstDay) / 7);
};

const WeeklyChart = () => {

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

  const initialData = [
    ["요일", t('SpendingAmount'), { role: "style" }, { role: "annotation" }],
    ["Sat", 0, "#EDF0F7", "0"+t('Won')],
    ["Sun", 0, "#EDF0F7", "0"+t('Won')],
    ["Mon", 0, "#EDF0F7", "0"+t('Won')],
    ["Tue", 0, "#EDF0F7", "0"+t('Won')],
    ["Wed", 0, "#EDF0F7", "0"+t('Won')],
    ["Thu", 0, "#EDF0F7", "0"+t('Won')],
    ["Fri", 0, "#EDF0F7", "0"+t('Won')]
  ];
  

  const [usage, setUsage] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [data, setData] = useState(initialData);
  const [selectedMonthWeek, setSelectedMonthWeek] = useState(() => {
    const today = new Date();
    const month = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
    const week = getWeekOfMonth(today);
    return `${month}-W${week}`;
  });
  const [filteredUsage, setFilteredUsage] = useState([]);
  const [filter, setFilter] = useState("total");
  const [memberId, setMemberId] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get('/api/t/test')
      .then(response => {
        const memberData = response.data;
        setMemberId(memberData.memberId);


        // memberId를 사용하여 결제 데이터 가져오기
        axios.post('/api/payment/by-member', { memberId: memberData.memberId })
          .then(paymentResponse => {
            console.log('Payment data:', paymentResponse.data); // 로그 추가
            setUsage(paymentResponse.data);
            filterDataByMonthWeek(selectedMonthWeek, paymentResponse.data); // 초기 데이터 필터링
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

    const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }


    if (usage.length > 0) {
      filterDataByMonthWeek(selectedMonthWeek, usage); // 선택된 주에 따라 데이터 필터링
    }
  }, [selectedMonthWeek]);

  const filterDataByMonthWeek = (monthWeek, data) => {
    const [selectedMonth, selectedWeek] = monthWeek.split('-W');
    const filteredData = data.filter(item => {
      const date = new Date(item.paymentDate);
      const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      const week = getWeekOfMonth(date);
      return month === selectedMonth && week.toString() === selectedWeek;
    }).sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)); // 최신순 정렬

    // 요일별 소비 금액 집계
    const dayTotals = filteredData.reduce((acc, curr) => {
      const date = new Date(curr.paymentDate);
      const day = date.getDay(); // 0 (일요일)부터 6 (토요일)까지 반환
      acc[day] = (acc[day] || 0) + curr.paymentPrice;
      return acc;
    }, {});

    // 초기 데이터 복사 및 업데이트
    const newData = initialData.map((item, index) => {
      if (index === 0) return item;
      const dayIndex = index - 1;
      const dayTotal = dayTotals[dayIndex] || 0;
      return [item[0], dayTotal, item[2], `${dayTotal}`];
    });

    // 가장 높은 값을 찾아 색상 변경
    const maxIndex = newData.reduce((maxIdx, row, idx, arr) => row[1] > arr[maxIdx][1] ? idx : maxIdx, 1);
    newData[maxIndex][2] = "#476EFF";

    setData(newData);
    setFilteredUsage(filteredData);

    // 주간 총 소비 금액 계산
    const totalWeekPrice = filteredData.reduce((acc, curr) => acc + curr.paymentPrice, 0);
    setTotalPrice(totalWeekPrice);
  };

  const generateMonthWeekOptions = () => {
    const options = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    if (currentYear !== 2024) return options;
    const currentMonth = currentDate.getMonth() + 1;
    for (let month = currentMonth; month >= 1; month--) {
      const monthValue = `2024-${month.toString().padStart(2, '0')}`;
      for (let week = 1; week <= 5; week++) { // 최대 5주까지 가능
        options.push(
          <option key={`${monthValue}-W${week}`} value={`${monthValue}-W${week}`}>
            2024{t('Year')} {month}{t('Month')} {week}{t('Week')}
          </option>
        );
      }
    }
    return options;
  };

  const getFilteredUsageByFilter = () => {
    if (filter === "income") {
      return filteredUsage.filter(item => item.paymentPrice > 0);
    } else if (filter === "expense") {
      return filteredUsage.filter(item => item.paymentPrice < 0);
    } else {
      return filteredUsage;
    }
  };

  return (
    <div className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
      <div className="header-menu">
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

      <div className="chart-container" style={{ marginTop: '20px' }}>
        <div style={{ justifyContent: 'flex-start', display: 'flex', margin: '10px 20px', fontSize: '20px', position: 'relative', fontWeight: 'bolder'  }}>
          <select
            value={selectedMonthWeek}
            onChange={(e) => setSelectedMonthWeek(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              backgroundPositionX: '5px',
              fontWeight: 'bold' 
            }}>
            {generateMonthWeekOptions()}
          </select>
          {t('UsageAmountForWeek')}
        </div>
        <div style={{ justifyContent: 'flex-start', display: 'flex', margin: '8px 20px', color: '#064AFF', fontWeight: 'bolder', fontSize: '25px' }}>
          {totalPrice.toLocaleString()}{" "+t('Won')}
        </div>
        <Chart
          chartType="ColumnChart"
          height="450px"
          data={data}
          options={options}
          loader={<div>Loading Chart...</div>}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px', margin: 'auto 20px' }}>
          <div
            onClick={() => setFilter("total")}
            style={{
              cursor: 'pointer',
              color: filter === "total" ? '#064AFF' : '#000',
              fontWeight: filter === "total" ? 'bold' : 'normal',
              width: '100%',  // 이 div의 너비를 부모에 맞추기
              display: 'flex',  // flex 속성 추가
              justifyContent: 'space-between'  // 자식 요소들을 공간 양 끝에 배치
            }}
          >
            <div>{t('TotalSpendingDetails')}</div>
            <div style={{ color: 'gray' }}
              onClick={() => navigate('/usage')}>
              {t('CardUsageDetails')}{'>'} </div>
          </div>

          {/* <span 
            onClick={() => setFilter("income")} 
            style={{
              cursor: 'pointer',
              color: filter === "income" ? '#064AFF' : '#000',
              fontWeight: filter === "income" ? 'bold' : 'normal'
            }}
          >
            입금
          </span>
          <span 
            onClick={() => setFilter("expense")} 
            style={{
              cursor: 'pointer',
              color: filter === "expense" ? '#064AFF' : '#000',
              fontWeight: filter === "expense" ? 'bold' : 'normal'
            }}
          >
            출금
          </span> */}
        </div>

        {
          getFilteredUsageByFilter().map((usage, index) => {
            return (
              <div style={{ display: 'flex', margin: '25px 20px', justifyContent: 'space-between', alignItems: 'center' }} key={index}>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <img src={require('../../assets/Arrow2.png')} alt='' />
                </div>
                <div style={{ flex: 1, marginLeft: '20px' }}>
                  <div style={{ fontWeight: 'bold', textAlign: 'start' }}>{usage.storeName}</div>
                  <div style={{ textAlign: 'start' }}>{new Date(usage.paymentDate).toLocaleString()}</div>
                </div>
                <div style={{ fontWeight: 'bold', color: '#064AFF' }}>{usage.paymentPrice.toLocaleString()}{" "+t('Won')}</div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default WeeklyChart;
