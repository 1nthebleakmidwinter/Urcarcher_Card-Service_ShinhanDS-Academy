import Axios from 'axios';
import Preloader from 'bootstrap-template/components/Preloader';
import React, { useEffect, useState } from 'react';
import { Container, Form, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';
import { useNavigate } from 'react-router-dom';

// Styled components with responsive design
const RechargeButton = styled(Button)`
  width: 70%;
  font-size: 20px;
  padding: 10px;

  @media (max-width: 768px) {
    font-size: 16px;
    width: 90%;
  }

  @media (max-width: 576px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const PaymentOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const PaymentOptionLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
  border: 2px solid #cccccc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 10px;

  &:hover {
    background-color: #f1f1f1;
    border-color: #aaaaaa;
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 8px;
  }

  @media (max-width: 576px) {
    font-size: 12px;
    padding: 6px;
  }
`;

const PaymentOptionInput = styled(Form.Check.Input)`
  margin-right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 576px) {
    width: 16px;
    height: 16px;
  }
`;

const CustomToggleButtonGroup = styled.div`
  display: flex;
  font-size: small;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const CustomToggleButton = styled.button`
  font-size: 11px;
  border-radius: 10px;
  border: 2px solid ${({ active }) => (active === 'true' ? '#476EFF' : '#cccccc')};
  background-color: ${({ active }) => (active === 'true' ? '#476EFF' : '#ffffff')};
  color: ${({ active }) => (active === 'true' ? '#ffffff' : '#333333')};
  font-weight: bold;
  width: 80px;
  height: 50px;
  text-align: center;
  line-height: 1.5;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active === 'true' ? '#365acb' : '#f1f1f1')};
    border-color: ${({ active }) => (active === 'true' ? '#365acb' : '#aaaaaa')};
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 45px;
  }

  @media (max-width: 576px) {
    width: 60px;
    height: 40px;
  }
`;

function ChargePayment(props) {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (selectedLanguage) => {
    const languageMap = {
      Korea: 'ko',
      English: 'en',
      Japan: 'jp',
      China: 'cn',
    };
    const languageCode = languageMap[selectedLanguage];
    i18n.changeLanguage(languageCode);
  };

  const [nowRemainPay, setNowRemainPay] = useState(); 
  const [amount, setAmount] = useState('10000');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card-simple');
  const [loading, setLoading] = useState(false);

  // 아임포트 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); 
    };
  }, []);

  const handleAmountChange = (value) => {
    if (value !== 'custom') {
      setAmount(value);
      setCustomAmount('');
    } else {
      setAmount(value);
    }
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount('custom');
  };

  const handlePaymentMethodChange = (e) => setPaymentMethod(e.currentTarget.value);

  const handleRecharge = () => {
    const IMP = window.IMP;
    IMP.init('imp74154355'); 

    const rechargeAmount = Number(amount === 'custom' ? customAmount : amount);
    let payMethod = 'card';

    if (paymentMethod === 'bank-transfer') {
      payMethod = 'trans';
    } else if (paymentMethod === 'virtual-account') {
      payMethod = 'vbank';
    } else if (paymentMethod === 'credit-card-general') {
      payMethod = 'card';
    }

    IMP.request_pay({
      pg: 'html5_inicis',
      pay_method: payMethod,
      merchant_uid: `mid_${new Date().getTime()}`,
      name: '어카처 선불카드 충전',
      amount: rechargeAmount,
      buyer_email: 'buyer@example.com',
      buyer_name: '홍길동',
      buyer_tel: '010-1234-5678',
      buyer_addr: '서울특별시 강남구 삼성동',
      buyer_postcode: '123-456',
    }, function(response) {
      if (response.success) {
        Axios.post('/api/card/chargeamount', {
          cardId: String(props.card.cardId),
          cardBalance: String(rechargeAmount),
        })
          .then(() => {
            setTimeout(() => {
              setLoading(false);
              const updatedBalance = Number(nowRemainPay) + rechargeAmount;
              props.onPaymentSuccess(props.card.cardId, updatedBalance);
              alert('충전이 완료되었습니다.');
              props.setShowModal(false);
            }, 3000);
          })
          .catch(() => {
            setTimeout(() => {
              setLoading(false);
              alert('충전에 실패하였습니다.');
              props.setShowModal(false);
            }, 3000);
          });
      } else {
        alert('결제에 실패하였습니다: ' + response.error_msg);
      }
    });
  };

  useEffect(() => {
    const savedLanguage = Cookies.get('selectedLanguage');
    if (savedLanguage) {
      changeLanguage(savedLanguage); 
    } else {
      changeLanguage('Korea');
    }

    Axios.get(`/api/card/get/${String(props.card.cardId)}`)
      .then((response) => {
        setNowRemainPay(response.data.cardBalance);
      })
      .catch(() => {
        alert('사용자 잔액 불러오는데 에러가 발생했습니다');
      });
  }, [props.card.cardId]);

  return (
    <Container>
      {loading && <Preloader type={'pulse'} variant={'primary'} center={true} />}
      <h5>{t('RechargeAmount')}</h5>
      <br />
      <CustomToggleButtonGroup>
        {['10000', '30000', '50000', '70000', '100000'].map((value) => (
          <CustomToggleButton
            key={value}
            active={(amount === value).toString()}
            onClick={() => handleAmountChange(value)}
          >
            {parseInt(value, 10).toLocaleString()}{" "+t('Won')}
          </CustomToggleButton>
        ))}
        <CustomToggleButton
          active={(amount === 'custom').toString()}
          onClick={() => handleAmountChange('custom')}
        >
          {t('EnterManually')}
        </CustomToggleButton>
      </CustomToggleButtonGroup>
      {amount === 'custom' && (
        <FormControl
          type="number"
          placeholder={t('EnterAmount')}
          value={customAmount}
          onChange={handleCustomAmountChange}
          className="mt-2"
        />
      )}
      <br />
      <br />
      <h5>{t('PaymentMethod')}</h5>
      <PaymentOptionContainer>
        <PaymentOptionLabel>
          <PaymentOptionInput
            type="radio"
            name="paymentMethod"
            value="credit-card-simple"
            checked={paymentMethod === 'credit-card-simple'}
            onChange={handlePaymentMethodChange}
          />
          {t('CreditCardPayment')}
        </PaymentOptionLabel>
        <PaymentOptionLabel>
          <PaymentOptionInput
            type="radio"
            name="paymentMethod"
            value="bank-transfer"
            checked={paymentMethod === 'bank-transfer'}
            onChange={handlePaymentMethodChange}
          />
          {t('BankTransfer')}
        </PaymentOptionLabel>
        <PaymentOptionLabel>
          <PaymentOptionInput
            type="radio"
            name="paymentMethod"
            value="virtual-account"
            checked={paymentMethod === 'virtual-account'}
            onChange={handlePaymentMethodChange}
          />
          {t('DirectDeposit')}
        </PaymentOptionLabel>
      </PaymentOptionContainer>

      <div className="my-3 text-muted">
        {t('CancelPayment')}
      </div>

      <h5>{t('AfterRecharge')}</h5>
      <div className="my-3">
        <h2 style={{ fontWeight: 'bold' }}>
          {(Number(nowRemainPay) + Number(amount === 'custom' ? customAmount : amount)).toLocaleString()}{" "+t('Won')}
        </h2>
      </div>

      <RechargeButton onClick={handleRecharge}>{t('Recharge')}</RechargeButton>
    </Container>
  );
}

export default ChargePayment;
