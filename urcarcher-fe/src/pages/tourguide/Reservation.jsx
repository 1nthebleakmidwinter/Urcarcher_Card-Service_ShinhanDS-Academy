import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';

function Reservation() {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (selectedLanguage) => {
    const languageMap = {
      Korea: 'ko',
      English: 'en',
      Japan: 'jp',
      China: 'cn'
    };

    const languageCode = languageMap[selectedLanguage];
    i18n.changeLanguage(languageCode);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPeople, setSelectedPeople] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [reservePerson, setReservePerson] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);

  // 이거 잠깐 보류
  // const location = useLocation();
  // const recv = location.state;

  // 세션 가져와
  const [recv, setRecv] = useState(null);


  let navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    updateAvailableTimes(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handlePeopleChange = (people) => {
    setSelectedPeople(people);
  };

  const handleNextClick = () => {
    if (!selectedPeople || !selectedDate || !selectedTime) {
      alert(t('PleaseCheckReservation'));
      return;
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  
  const today = new Date(); // 지난 날짜 설정 못하게 추가

  useEffect(() => {

    const savedLanguage = Cookies.get('selectedLanguage');
    if (savedLanguage) {
      changeLanguage(savedLanguage); // 언어 변경
    } else {
      changeLanguage('Korea'); // 기본 언어 설정
    }

    const storedData = sessionStorage.getItem('reservationData');
    if (storedData) {
      setRecv(JSON.parse(storedData));
    }


    Axios.get("/api/t/test").then((response) => {
      setReservePerson(response.data);
      //console.log(reservePerson);
    });
  }, []);

  useEffect(() => {
    // selectedDate와 관련된 로직을 처리하는 useEffect
    updateAvailableTimes(selectedDate);
  }, [selectedDate]); // selectedDate가 변경될 때만 호출


   // 시간 목록을 업데이트하는 함수
   const updateAvailableTimes = (date) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const availableTimesArray = [
      '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
    ];

    // 현재 시각을 기준으로 유효한 시간만 필터링
    const updatedAvailableTimes = availableTimesArray.filter((time) => {
      const [hour] = time.split(':').map(Number);
      if (selectedDate.toDateString() === today.toDateString()) {
        return hour > currentHour || (hour === currentHour && currentMinute < 0);
      }
      return true;
    });

    setAvailableTimes(updatedAvailableTimes);
  };

  return (
    
    <ScrollableContainer>
      {recv ? (
        <>
      <br />
      <br />
      <br />
      <br />
      <StyledContainer style={{ fontFamily: 'NanumSquareNeo' }}>
        <h3 style={{ marginBottom: '30px' }}> {recv.title}</h3>
        <StyledRow>
          <StyledCol>
            <Header style={{ textAlign: 'left' }}>{t('SelectNumberOfPeople')}</Header>
            <PeopleSelect>
              {['1' + t('Person'), '2' + t('Person'), '3' + t('Person'), '4' + t('Person'), '5' + t('MoreThan')].map((people, index) => (
                <CustomButton
                  key={index}
                  active={selectedPeople === people}
                  onClick={() => handlePeopleChange(people)}
                >
                  {people}
                </CustomButton>
              ))}
            </PeopleSelect>
          </StyledCol>
        </StyledRow>
        <Divider />
        <StyledRow>
          <StyledCol>
            <Header style={{ textAlign: 'left' }}>{t('SelectDate2')}</Header>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="react-calendar modern-calendar"
              minDate={today} // 현재 날짜를 최소 선택 날짜로 설정
            />
          </StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledCol>
            <Header style={{ textAlign: 'left' }}>{t('SelectTime')}</Header>
            <TimeSelect>
              {availableTimes.map((time, index) => (
                <CustomButton
                  key={index}
                  active={selectedTime === time}
                  onClick={() => handleTimeChange(time)}
                >
                  {time}
                </CustomButton>
              ))}
            </TimeSelect>
          </StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledCol>
            <Divider />
            <Header>※ {t('PleaseConfirmWhenBooking')}</Header>
            <Notice>{t('SameDayCancellationNotAllowed')}</Notice>
            <Notice>
              {t('Merchant')} Urcarchar {t('CardPayment')} <Discount>10%{t('Discount')}</Discount>
            </Notice>
          </StyledCol>
        </StyledRow>
        <StyledRow>
          <CenteredCol>
            <StyledNextButton variant="primary" onClick={handleNextClick}>
              {t('Next')}
            </StyledNextButton>
          </CenteredCol>
        </StyledRow>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t('BookingConfirmation')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalContent>
              <ReservationBox>
                <ReservationTitle>{recv.title} {t('Booking')}</ReservationTitle>
                <hr />
                <p style={{ textAlign: 'left' }}>{t('Schedule')}: {selectedDate.toLocaleDateString()} - {selectedTime}</p>
                <p style={{ textAlign: 'left' }}>{t('NumberOfPeople')}: {selectedPeople}</p>
                <p style={{ textAlign: 'left', color: 'red' }}>
                  {t('Deposit')}: {(parseInt(selectedPeople, 10) * 10000).toLocaleString()}{" " + t('Won')}
                </p>
                <p style={{ textAlign: 'left' }}>{t('Location')} : {recv.location}</p>
              </ReservationBox>
              <InfoSection>
                <InfoTitle>{t('BookerInformation')}</InfoTitle>
                <hr />
                {reservePerson ? (
                  <>
                    <p style={{ textAlign: 'left' }}>{t('Booker')}: {reservePerson.name}</p>
                    <p style={{ textAlign: 'left' }}>{t('PhoneNumber')}: {reservePerson.phoneNumber}</p>
                    <p style={{ textAlign: 'left' }}>{t('Email')}: {reservePerson.email}</p>
                    <Input placeholder={t('Requests')} />
                  </>
                ) : (
                  <p style={{ textAlign: 'left', color: 'red' }}>{t('LoadingBookerInformation')}...</p>
                )}
              </InfoSection>
            </ModalContent>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary"
          onClick={()=>{
            navigate('/reservePayment', {
              state: {
                  img: recv.img,
                  title: recv.title,  // 상호명
                  reserveDate: selectedDate,    // 예약날짜
                  reserveTime: selectedTime,  // 예약시간
                  reserveLocation: recv.location, // 예약 위치
                  price: parseInt(selectedPeople, 10) * 10000,
                  classification: 2, //분류추가 - 맛집:2
                  reservePersonNum:parseInt(selectedPeople, 10) //Int형식으로 변경
              }
          });
          }}>{t('DepositPayment')}</Button>
          
            <CancelButton onClick={handleClose}>
              {t('Cancel')}
            </CancelButton>
          </Modal.Footer>
        </Modal>
      </StyledContainer>
      </>
      ):(
        <p>Loading data...</p> // recv가 null일 때 표시할 내용을 추가
      )}
    </ScrollableContainer>
  );
}

const ScrollableContainer = styled.div`
  max-height: 800px;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
`;

const StyledContainer = styled(Container)`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const StyledRow = styled(Row)`
  margin-bottom: 20px;
`;

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h5`
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 1.1em;
  color: #333;
`;

const PeopleSelect = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CustomButton = styled.button.attrs(props => ({
  active: props.active ? 'true' : undefined,
}))`
  flex: 1 1 auto;
  margin-right: 10px;
  text-align: center;
  padding: 10px 0;
  border-radius: 20px;
  font-size: 0.9em;
  border: 2px solid ${(props) => (props.active === 'true' ? '#007bff' : '#cccccc')};
  background-color: ${(props) => (props.active === 'true' ? '#007bff' : '#ffffff')};
  color: ${(props) => (props.active === 'true' ? '#ffffff' : '#333')};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
  }

  &:last-child {
    margin-right: 0;
  }
`;


const TimeSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Divider = styled.hr`
  border-top: 1px solid #ccc;
`;

const Notice = styled.p`
  margin: 0;
`;

const Discount = styled.span`
  color: red;
  font-weight: bold;
`;

const CenteredCol = styled(Col)`
  display: flex;
  justify-content: center;
`;

const StyledNextButton = styled(Button)`
  width: 80%;
  padding: 10px 0;
  font-size: 1em;
`;

const CancelButton = styled(Button)`
  background-color: #cccccc !important;
  color: #333 !important;
  border: none;
  
  &:hover {
    background-color: #aaaaaa !important;
    color: white !important;
  }
`;

const ModalContent = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const ReservationBox = styled.div`
  background-color: #E5EAFF;
  color: black;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const ReservationTitle = styled.h6`
  font-size: 1.1em;
  margin-bottom: 10px;
`;

const InfoSection = styled.div`
  background-color: #EDF0F7;
  padding: 15px;
  border-radius: 10px;
`;

const InfoTitle = styled.h6`
  font-size: 1em;
  margin-bottom: 10px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 0.9em;
`;

export default Reservation;
