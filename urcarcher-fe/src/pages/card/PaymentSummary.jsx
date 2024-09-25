import Axios from 'axios';
import Preloader from 'bootstrap-template/components/Preloader';
import React, { useEffect, useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap'; // Modal 추가
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';

function PaymentSummary(props) {
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    return `${month}${t('Month')} ${day}${t('Day')}`;
  }

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

  const [loading, setLoading] = useState(false);
  const [expectedAmount, setExpectedAmount ] = useState();
  const [expectedPayDate, setExpectedPayDate] = useState();

  const [recentPay, setRecentPay] = useState();
  const [recentPayDate, setRecentPayDate] = useState();
  const [recentPayLocation, setRecentPayLocation] = useState();

  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지 상태 추가

  function paymentHandler() {
    setLoading(true);

    Axios.post("/api/payment/immediatepayment", {
      cardId: String(props.card.cardId),
      paymentDate: String(props.card.paymentDate)
    })
    .then(() => {
      setTimeout(() => {
        setLoading(false);
        setModalMessage(t('ImmediatePaymentSuccess')); // 성공 메시지 설정
        setShowModal(true); // 모달 열기
        setTimeout(() => {
          setShowModal(false); // 2초 후에 모달 닫기
          props.setShowModal(false);
        }, 2000); // 2초 동안 모달 유지
      }, 3000);
    })
    .catch(() => {
      setTimeout(() => {
        setLoading(false);
        setModalMessage(t('ImmediatePaymentFailure')); // 실패 메시지 설정
        setShowModal(true); // 모달 열기
        setTimeout(() => {
          setShowModal(false); // 2초 후에 모달 닫기
          props.setShowModal(false);
        }, 2000); // 2초 동안 모달 유지
      }, 3000);
    });
  }

  useEffect(() => {
    const savedLanguage = Cookies.get('selectedLanguage');
    if (savedLanguage) {
      changeLanguage(savedLanguage); 
    } else {
      changeLanguage('Korea'); 
    }

    Axios.post('/api/payment/detailpayment', {
      cardId: String(props.card.cardId),
      paymentDate: String(props.card.paymentDate)
    })
    .then((response) => {
      setExpectedAmount(response.data);
      setExpectedPayDate(props.card.paymentDate);
    })
    .catch((error) => {
      setModalMessage(t('ErrorFetchingEstimatedAmount')); // 오류 메시지 설정
      setShowModal(true); // 모달 열기
    });

    Axios.post("/api/payment/recentpayment", { cardId: String(props.card.cardId) })
    .then((response) => {
      setRecentPay(response.data.paymentPrice);
      setRecentPayDate(response.data.paymentDate.replace(/T/g, ' '));
      setRecentPayLocation(response.data.storeName);
    })
    .catch(() => {});
  }, [props.card]);

  return (
    <Container style={{ width: '400px' }}>
      {loading && <Preloader type={'pulse'} variant={'primary'} center={true} />}
      <Card>
        <Title>{formatDate(expectedPayDate)} {t('EstimatedPaymentAmount')}</Title>
        <Amount>{Number(expectedAmount).toLocaleString()}{" " + t('Won')}</Amount>
        <br />
        <PaymentButton onClick={paymentHandler}>{t('ImmediatePayment')}</PaymentButton>
      </Card>

      <RecentActivity>
        <p style={{ marginBottom: '0px' }}>
          {recentPayLocation ? (
            <>
              {t('Recent')} <span style={{ fontWeight: 'bold' }}>{recentPayLocation}</span>{t('From')}
              <span style={{ fontWeight: 'bold' }}> {Number(recentPay).toLocaleString()} </span>{" " + t('Won')}{t('PaymentCompleted')}
            </>
          ) : (
            ''
          )}
        </p>
        <p style={{ marginTop: '0px' }}>{recentPayDate}</p>

        <ActivityDetail>
          <Link to="/chart1" style={{ textDecoration: 'underline', color: '#476EFF' }}>{t('ViewRecentTransactions')}</Link>
        </ActivityDetail>
      </RecentActivity>

      {/* 모달 컴포넌트, centered 속성 추가 */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>알림</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

const Card = styled.div`
  background-color: #f0f4f7;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
`;

const Title = styled.h5`
  font-size: 20px;
  font-weight: bold;
`;

const Amount = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin: 0;
`;

const PaymentButton = styled(Button)`
  background-color: #0023fc;
  color: white;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 14px;
`;

const RecentActivity = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #333;
`;

const ActivityDetail = styled.div`
  justify-content: flex-end;
`;

export default PaymentSummary;
