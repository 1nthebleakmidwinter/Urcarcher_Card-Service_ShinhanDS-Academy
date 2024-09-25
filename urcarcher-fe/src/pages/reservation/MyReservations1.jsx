import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import "./myReservation.css"; // 스타일링을 위한 CSS 파일
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import calImg from 'assets/icon-leave.png';

function MyReservations1() {

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


  const [userId, setUserId] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [currentReservations, setCurrentReservations] = useState([]); // 현재 표시되는 예약 목록
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [selectedReservation, setSelectedReservation] = useState(null);
  const [view, setView] = useState('all'); // 현재 보이는 목록을 구분
  const [selectedButton, setSelectedButton] = useState('all'); // 선택된 버튼 상태 관리
  const [linkData, setLinkData] = useState({ path: '/performanceList', text: '공연 예약 바로가기' }); // Link 경로와 텍스트 상태 관리

  useEffect(() => {

    const savedLanguage = Cookies.get('selectedLanguage');
    if (savedLanguage) {
        changeLanguage(savedLanguage); // 언어 변경
    } else {
        changeLanguage('Korea'); // 기본 언어 설정
    }

    // 회원 정보 가져오기
    const fetchUserId = async () => {
      try {
        const response = await Axios.get('/api/t/test');
        setUserId(response.data.memberId);
      } catch (error) {
        alert("회원정보를 가져오는데 오류 발생");
      }
    };

    fetchUserId();
  }, []); // 빈 배열로 컴포넌트가 처음 마운트될 때 한 번만 호출

  useEffect(() => {
    if (userId === null) return; // userId가 없으면 API 호출하지 않음

    // 예약 정보 가져오기
    const fetchReservations = async () => {
      try {
        const response = await Axios.get(`/api/reserve/myReservation1/${userId}`);
        setReservations(response.data);
        setCurrentReservations(response.data); // 기본 예약 목록으로 설정
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId]); // userId가 변경될 때 호출

  // 보기 전환 핸들러
  const showAllReservations = () => {
    setCurrentReservations(reservations); // 모든 예약 목록으로 설정
    setView('all');
    setSelectedButton('all');
    setLinkData({ path: '/performanceList', text: '공연 예약 바로가기' });
  };

  const showPerformanceReservations = () => {
    setCurrentReservations(reservations.filter(reservation => reservation.classification === 1));
    setView('performance');
    setSelectedButton('performance');
    setLinkData({ path: '/performanceList', text: '공연 예약 바로가기' });
  };

  const showRestaurantReservations = () => {
    setCurrentReservations(reservations.filter(reservation => reservation.classification === 2));
    setView('restaurant');
    setSelectedButton('restaurant');
    setLinkData({ path: '/searchtour', text: '맛집 바로가기' }); // Link 경로와 텍스트 변경
  };

  // 컴포넌트가 렌더링될 때 currentReservations를 콘솔에 출력하여 문제를 확인합니다.
  useEffect(() => {
    console.log("Current reservations:", currentReservations);
  }, [currentReservations]);

  if (loading) return <p>Loagding...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='contents'>
      <div className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
        <div style={{ position: 'relative' }}>
          <div className='region-buttons2'>
            <button 
              id="all-reservations" 
              className={`reservationList-button2 ${selectedButton === 'all' ? 'active' : ''}`} 
              onClick={showAllReservations}>{t('fullList')}</button>
            <button 
              id="performance-reservations" 
              className={`reservationList-button2 ${selectedButton === 'performance' ? 'active' : ''}`} 
              onClick={showPerformanceReservations}>{t('performanceList')}</button>
            <button 
              id="restaurant-reservations" 
              className={`reservationList-button2 ${selectedButton === 'restaurant' ? 'active' : ''}`} 
              onClick={showRestaurantReservations}>{t('restaurantList')}</button>
          </div>
          <p style={{margin:'0'}}>{t('reservationClickDetails')}</p>
          {currentReservations.length > 0 ? (
            <ul className='res-ul'>
              {currentReservations.map((reservation) => {

                return (
                  <li className='list-item res-li' key={reservation.reservationId}>
                    <hr />
                    <Link to={`/myReservationList1Detail/${reservation.reservationId}`}>
                      <div className='list-up'>
                          <div className='up'>
                            <h6 style={{ fontSize: "13px", color: "#b1b1b1" }}>
                              {reservation.reservationDate}
                            </h6>
                            <h5 className='right-text'>{reservation.peopleNum} {t('ticket_unit')}</h5>
                          </div>
                        <div className='list-down'>
                          <div className='down'>
                            <h5>{reservation.name}</h5>
                          {/* <h6 className='right-text'>[{reservation.state === 0 ? t('reservation_cancellation') : t('reservation_confirmation')}]</h6> */}
                          <h6 
                            className='right-text'
                            style={{ color: reservation.state === 0 ? "#F77777" : reservation.state === 1 || reservation.state === 2 ? "#476eff" : "" }}
                          >
                            [{reservation.state === 0 ? "예약취소" : reservation.state === 1 ? "예약완료" : reservation.state === 2 ? "사용완료" : ""}]
                          </h6>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className='noReservList-wrap'>
              <img src={calImg} alt="느낌표달력" />
              <p>예약 내역이 존재하지 않습니다.</p>
              <div className='goReservBtn'>
                  <Link to={linkData.path}>{linkData.text}</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyReservations1;
