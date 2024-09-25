import React, { useState, useEffect } from 'react';
import "./reservation.css";
import LoadingSpinner from 'components/LoadingSpinner';
import { Link } from 'react-router-dom';

function PerformanceList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [region, setRegion] = useState('11'); // 초기값을 '11'(서울)로 설정
  const [dropdownOpen, setDropdownOpen] = useState(true); // 드롭다운 상태 관리


  const regionNames = {
    '11': '서울',
    '26': '부산',
    '27': '대구',
    '28': '인천',
    '29': '광주',
    '30': '대전',
    '31': '울산',
    '36': '세종',
    '41': '경기',
    '51': '강원',
    '43': '충북',
    '44': '충남',
    '45': '전북',
    '46': '전남',
    '47': '경북',
    '48': '경남',
    '50': '제주',
  };

  function getFirstDayOfCurrentMonth() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  function getFirstDayOfNextMonth() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth()+1, 1);
  }
  
  function getLastDayOfNextMonth() {
    const date = new Date();
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
  }
  
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }
  
  const firstDayOfCurrentMonth = formatDate(getFirstDayOfCurrentMonth());
  const lastDayOfNextMonth = formatDate(getLastDayOfNextMonth());
  const firstDayOfNextMonth = formatDate(getFirstDayOfNextMonth());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 로딩 상태를 true로 설정
      try {
        const response = await fetch(`/api/reservation/reservation-info?signgucode=${region}&stdate=${firstDayOfCurrentMonth}&eddate=${lastDayOfNextMonth}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log(region);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [region]); // region 값이 변경될 때마다 데이터를 다시 가져옴

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState); // 드롭다운 열기/닫기
  };

  const handleRegionChange = (code) => {
    setRegion(code); // 지역 코드를 업데이트
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="contents"><p>Error: {error}</p></div>;

  return (
    <div className="reserve-contents contents">
       <div className="dropdown">
        {dropdownOpen && (
          <div className="region-buttons">
            {Object.entries(regionNames).map(([code, name]) => (
              <button
                key={code}
                onClick={() => handleRegionChange(code)}
                className={`region-button ${region === code ? 'active' : ''}`}
              >
                {name}
              </button>
            ))}
          </div>
        )}
        {/* <div className="dropdown-controls">
          <button onClick={toggleDropdown} className="toggle-button">
            {dropdownOpen ? "닫기" : "지역: "+ regionNames[region]}
          </button>
        </div> */}
      </div>
      <div className='reserve-list-wrap'>
        <div className="row">
          {data?.db.map((item) => (
            <div key={item.mt20id} className="col-lg-3 col-md-6 mb-4">
              <Link to={`./detail/${item.mt20id}`}>
                <div className="reserve-card">
                  <img className="reserve-card-img-top rounded-0" src={item.poster} alt={`${item.prfnm} 포스터`} />
                  {/* <p>{item.prfstate}</p> */}
                  <div className="reserve-card-body-box">
                    <h5 className="reserve-card-title">{item.prfnm}</h5>
                    <h6 className="reserve-card-subtitle mb-2 text-muted">{item.genrenm}</h6>
                    <p className="reserve-card-text date">{item.prfpdfrom} ~ {item.prfpdto}</p>
                    <p className="reserve-card-text venue">{item.fcltynm}</p>
                    <p className="reserve-card-text status">{item.prfstate}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PerformanceList;