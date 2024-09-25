import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import "./myReservation.css"; // 스타일링을 위한 CSS 파일
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import calImg from 'assets/icon-leave.png';
import doneImg from "assets/icons-done.gif";

function MyReservations1Detail() {

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


  const { reservationId } = useParams(); // URL 파라미터에서 reservationId를 가져옵니다.
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [reservation, setReservation] = useState(null); // 단일 예약 정보를 저장
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [countdown, setCountdown] = useState(3); // 카운트다운 초기값 (3초)

  // 오늘 날짜 계산
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 포맷

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
    if (userId === null || reservationId === undefined) return; // userId가 없거나 reservationId가 없으면 API 호출하지 않음

    // 예약 정보 가져오기
    const fetchReservation = async () => {
      try {
        const response = await Axios.get(`/api/reserve/myReservation1/detail/${reservationId}`);
        setReservation(response.data); // 단일 예약 정보를 설정
        // 예약의 memberId가 현재 userId와 다른 경우 메인 화면으로 이동
        if (response.data.memberId !== userId) {
            navigate('/'); // 메인 화면으로 이동
          } else {
            setLoading(false);
          }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReservation();
  }, [userId, reservationId]); // userId와 reservationId가 변경될 때 호출

  // 예약 삭제 핸들러
  const handleDelete = async () => {
    try {
      await Axios.put('/api/reserve/delete', { reservationId });
      setShowModal(false); // 모달 닫기
      setShowSuccessModal(true); // 성공 메시지 모달 표시
      startCountdown(); // 카운트다운 시작
      
    } catch (error) {
      alert("예약 삭제에 오류가 발생했습니다.");
    }
  };
  // 카운트다운 시작 함수
  const startCountdown = () => {
    setCountdown(3); // 3초부터 시작
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          // 일정 시간 후 페이지 이동
          navigate('/myReservationList1'); // 3초 후 페이지 이동
        }
        return prev - 1;
      });
    }, 1000); // 1초마다 카운트 감소
  };

  // 모달 열기
  const openModal = () => {
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setShowSuccessModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

   // 예약 시간이 null 또는 undefined일 경우 기본값을 설정합니다.
   const time = reservation.reservationTime || ''; // 기본값을 빈 문자열로 설정
   const formattedTime = time.replace(':00', '');

  return (
    <div className='contents'>
      <div className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
        <div style={{ position: 'relative' }}>
          {reservation ? (
            <div className="reservation-item" key={reservation.reservationId}>
              <h3 style={{textAlign:'center'}}>예약 정보</h3>
              <hr />
              <h5 style={{textAlign:'center', marginBottom:'25px'}}>{reservation.name}</h5>
              <p>{t('date')}: {reservation.reservationDate}</p>
              <p>{t('time')}: {formattedTime}</p>
              <p>
                {t('status')}:
                {reservation.state === 1 ? " " + t('reservation_confirmation') : 
                reservation.state === 0 ? " "+ t('reservation_cancellation') : 
                reservation.state === 2 ? " " + "사용 완료" :  t('unknown')}
              </p>
              <p>
                {reservation.classification === 1 ?  t('performance_name')+": " + reservation.name : 
                reservation.classification === 2 ? t('restaurant_name')+": " + reservation.name : 
                t('no_name')}
              </p>
              <p>{t('Location')}: {reservation.location}</p>
              <p>{t('NumberOfPeople')}: {reservation.peopleNum}명</p>
              <p>{t('seat')}: {reservation.seat}</p>
              <button
                className="btn btn-primary"
                onClick={openModal}
                disabled={reservation.state === 0 || ((reservation.state === 1 || reservation.state === 2) && reservation.reservationDate <= today)}
              >
                {(reservation.state === 1 || reservation.state === 2)  && reservation.reservationDate <= today ? t('expired') : t('reservation_cancellation')}
              </button>
              {/* <hr /> */}
            </div>
          ) : (
            <p>{t('no_reservations')}</p>
          )}
        </div>

        {/* 예약 취소 확인 모달 */}
        {showModal && (
          <div className="reservation-modal-overlay">
            <div className="reservation-modal-content">
              <img src={calImg} alt="" 
                style={{width:'60px', padding:'10px 0 20px'}}
              />
              <h3>{t('cancel_reservation')}</h3>
              <div className='res-info-text'>
                <p className='res-info-title'>{reservation.name}</p>
                <p>예약날짜 : {reservation.reservationDate} ({formattedTime})</p>
                <p>예약인원 : {reservation.peopleNum}명</p>
              </div>
              <br/>
            
              <div className="res-modal-buttons">
              <button className="res-can-button" onClick={handleDelete} style={{backgroundColor:'#f77777'}}>{t('yes')}</button>
              <button className="res-can-button" onClick={closeModal} style={{backgroundColor:'#444'}}>{t('no')}</button>
              </div>
            </div>
          </div>
        )}

        {/* 예약 취소 완료 모달 */}
        {showSuccessModal && (
          <div className="reservation-modal-overlay">
            <div className="reservation-modal-content">
              <img src={doneImg} alt="완료" 
                style={{margin:'10px 0 20px', opacity:'0.5'}}
              />
              <h3 style={{marginBottom:'25px', color:'#476eff'}}>{t('reservation_cancelled')}
                <br />
                {/* {t('page_redirecting')} */}
                </h3>
              {/* <button className="btn btn-primary" onClick={closeModal} style={{fontWeight:'bold'}}>
                {t('Confrim')}
              </button> */}
              {/* <span> {t('page_redirecting')} </span> */}
              <span>{t('page')} {countdown} {t('goMove')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyReservations1Detail;
