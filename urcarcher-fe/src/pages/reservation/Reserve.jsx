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

function Reserve() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPeople, setSelectedPeople] = useState('');
  const [selectedSeat, setSelectedSeat] = useState(''); // 단일 좌석 선택 상태로 변경
  const [seatPrices, setSeatPrices] = useState({}); // 좌석 가격 상태 추가
  const [totalPrice, setTotalPrice] = useState(0); // 총 예약금 상태 추가
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [reservePerson, setReservePerson] = useState(null);
  const location = useLocation();
  const recv = location.state;
  let navigate = useNavigate();

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


  useEffect(() => {

    const savedLanguage = Cookies.get('selectedLanguage');
    if (savedLanguage) {
        changeLanguage(savedLanguage); // 언어 변경
    } else {
        changeLanguage('Korea'); // 기본 언어 설정
    }


    Axios.get("/api/t/test").then((response) => {
      setReservePerson(response.data);
      console.log(response.data); // reservePerson 대신 response.data 출력
    });
  }, []); // 빈 배열을 사용하여 처음 렌더링 시에만 실행

  useEffect(() => {
    // 좌석 가격 데이터를 상태에 저장
    const prices = {};
    recv.seatingData.forEach(seat => {
      prices[seat.type] = seat.price;
    });
    setSeatPrices(prices);
  }, [recv]);

  useEffect(() => {
    // 선택된 좌석에 따른 총 예약금 계산
    const newTotalPrice = seatPrices[selectedSeat] || 0;
    setTotalPrice(newTotalPrice);
  }, [selectedSeat, seatPrices]);

  const handlePeopleChange = (people) => {
    setSelectedPeople(people);
  };

  const handleSeatChange = (seat) => {
    setSelectedSeat(seat); // 선택한 좌석으로 상태 변경
  };

  const handleNextClick = () => {
    if (!selectedDate || !selectedTime || !selectedPeople || !selectedSeat) {
      setErrorMessage('모든 항목을 선택해 주세요.');
      return;
    }
    setShowModal(true);
    setErrorMessage('');
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState({});

  useEffect(() => {
    // 날짜 범위 생성
    const startDate = new Date(recv.resStart.replaceAll('.', '-'));
    const endDate = new Date(recv.resEnd.replaceAll('.', '-'));

    const dates = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    setAvailableDates(dates);

    // 첫 공연일을 기본 선택 날짜로 설정
    if (dates.length > 0) {
      setSelectedDate(dates[0]);
    }

    // dtguidance에서 요일별 시간을 파싱하여 사용 가능한 시간 설정
    const times = {};
    const dayMap = {
      '일요일': 0,
      '월요일': 1,
      '화요일': 2,
      '수요일': 3,
      '목요일': 4,
      '금요일': 5,
      '토요일': 6,
    };

    recv.resTime.split('),').forEach((entry, idx) => {
      const cleanedEntry = idx === recv.resTime.split('),').length - 1 ? entry : entry + ')';
      const [daysPart, timesPart] = cleanedEntry.split('(');
      const dayRange = daysPart.trim();
      const timeValues = timesPart ? timesPart.replace(')', '').split(',').map(time => time.trim()) : [];

      console.log(`Parsing entry: ${cleanedEntry.trim()}`);
      console.log(`Days: ${dayRange}`);
      console.log(`Times: ${timeValues.join(', ')}`);

      const [startDay, endDay] = dayRange.split('~').map(day => day.trim());
      const startIdx = dayMap[startDay];
      const endIdx = endDay ? dayMap[endDay] : startIdx;

      for (let i = startIdx; i <= endIdx; i++) {
        const dayKey = Object.keys(dayMap).find(key => dayMap[key] === i);
        if (dayKey) {
          times[dayKey] = times[dayKey] ? [...new Set([...times[dayKey], ...timeValues])] : [...timeValues];
        }
      }
    });

    console.log('Available Times:', times);
    setAvailableTimes(times);

  }, [recv.resStart, recv.resEnd, recv.resTime]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);  // 날짜 변경 시 시간 초기화
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const isDateSelectable = (date) => {
    return availableDates.some(d => d.toDateString() === date.toDateString());
  };

  const getAvailableTimesForSelectedDate = () => {
    const dayOfWeek = selectedDate.toLocaleString('ko-KR', { weekday: 'long' });
    return availableTimes[dayOfWeek] || [];
  };

  return (
    <ScrollableContainer>
      <br />
      <br />
      <br />
      <br />
      <StyledContainer>
        <h2>{t('performance_name')} : {recv.title}</h2>
        <StyledRow>
          <StyledCol>
            <Header>{t('SelectNumberOfPeople')}</Header>
            <PeopleSelect>
              {['1' + t('Person'), '2' + t('Person'), '3' + t('Person'), '4' + t('Person')].map((people, index) => (
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
          <Header>{t('SelectDate2')}</Header>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="react-calendar modern-calendar"
            tileDisabled={({ date }) => !isDateSelectable(date)}
          />
        </StyledCol>
      </StyledRow>
      <StyledRow>
        <StyledCol>
          <Header>{t('SelectTime')}</Header>
          <TimeSelect>
            {getAvailableTimesForSelectedDate().map((time, index) => (
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
            <Header>{t('select_seat')}</Header>
            <SeatSelect>
              {recv.seatingData.map((seat, index) => (
                <CustomButton
                  key={index}
                  active={selectedSeat === seat.type}
                  onClick={() => handleSeatChange(seat.type)}
                >
                  {seat.type} - {seat.price.toLocaleString()}원
                </CustomButton>
              ))}
            </SeatSelect>
            <Divider />
            <Header>{t('PleaseConfirmWhenBooking')}</Header>
            <Notice>{t('SameDayCancellationNotAllowed')}</Notice>
            <Notice>
            {t('Merchant')} Urcarchar {t('CardPayment')} <Discount>10%{t('Discount')}</Discount>
            </Notice>
          </StyledCol>
        </StyledRow>
        
        <p style={{color: 'red'}}>{errorMessage}</p>
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
                <p style={{ textAlign: 'left' }}>{t('date')}: {selectedDate.toLocaleDateString()} - {selectedTime}</p>
                <p style={{ textAlign: 'left' }}>{t('NumberOfPeople')}: {selectedPeople}</p>
                <p style={{ textAlign: 'left' }}>{t('seat')}: {selectedSeat}</p> {/* 단일 좌석 표시 */}
                <p style={{ textAlign: 'left', color: 'red' }}>
                {t('Deposit')}: {(totalPrice * parseInt(selectedPeople, 10)).toLocaleString()}원
                </p>
                <p style={{ textAlign: 'left' }}>{t('Location')} : {recv.location}</p>
                <p style={{ textAlign: 'left' }}>{t('time')} : {selectedTime}</p>
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
            <Button
              variant="primary"
              onClick={() => {
                navigate('/reservePayment', {
                  state: {
                    img: recv.img,
                    title: recv.title,
                    price: totalPrice * parseInt(selectedPeople, 10), // 선택한 좌석 가격 합계
                    peopleNum: parseInt(selectedPeople, 10),
                    resDate: selectedDate,
                    resTime: selectedTime, //시간 추가
                    selectedSeat, // 단일 좌석 정보 추가
                    locations: recv.location,
                    classification: 1 //1: 공연 2:맛집
                  }
                });
              }}
            >
              {t('DepositPayment')}
            </Button>
            <CancelButton onClick={handleClose}>{t('Cancel')}</CancelButton>
          </Modal.Footer>
        </Modal>
      </StyledContainer>
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

const SeatSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
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


export default Reserve;
