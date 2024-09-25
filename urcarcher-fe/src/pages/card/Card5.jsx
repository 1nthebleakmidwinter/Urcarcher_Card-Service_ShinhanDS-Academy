import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, Field } from 'formik';
import ProgressBar from './ProgressBar';
import { Button, Form } from 'react-bootstrap';
import { useCardContext } from './CardContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';
import { useEffect, useState } from 'react';


const Card5 = () => {
  const { produceCardOffer, setProduceCardOffer } = useCardContext();
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
    


  const styles = {
    formGroupWithLabel: {
      position: 'relative',
      marginBottom: '24px',
    },
    formLabel: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      fontSize: '14px',
      color: '#888',
      transition: 'all 0.2s ease',
      pointerEvents: 'none',
    },
    labelFocused: {
      top: '-8px',
      left: '12px',
      fontSize: '12px',
      color: '#007BFF',
      backgroundColor: '#fff',
      padding: '0 4px',
      borderRadius: '4px',
    },
  };

  // 계좌번호 포맷 함수
  const formatAccountNumber = (value) => {
    return value
      .replace(/[^0-9]/g, '')          // 숫자 외의 문자 제거
      .replace(/(\d{3})(\d{2})(\d{6})/, '$1-$2-$3')  // 형식 적용
      .replace(/(-\d{6})\d+?$/, '$1');  // 추가 입력 방지
  };

  useEffect(()=>{
   
    const savedLanguage = Cookies.get('selectedLanguage');
    if (savedLanguage) {
        changeLanguage(savedLanguage); // 언어 변경
    } else {
        changeLanguage('Korea'); // 기본 언어 설정
    }
},[]);


  return (
    <div style={{ marginTop: '140px'}}>
      <ProgressBar
        stages={['카드 선택', '정보 입력', '동의 사항', '카드 수령', '결제 정보']}
        currentStage={'결제 정보'}
      />
      <div style={{margin: 'auto 50px' }}>
      <Formik
        initialValues={{
          accountNumber: "", // 초기값 설정
          bank: "",
          paymentDate: "01",
          cardPassword: "",
          cardPassword2: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          setProduceCardOffer(prevState => ({
            ...prevState,
            payment_bank: values.bank,
            payment_date: values.paymentDate,
            card_account: values.accountNumber,
            card_password: values.cardPassword,
          }));
          navigate('/card6');
        }}
      >
        {({ handleSubmit, values }) => (
          <FormikForm onSubmit={handleSubmit}>
            <h4 style={{ marginTop: '30px', textAlign:'left', fontWeight: 'bold'}}>{t('PayInfo&')} </h4>
            <h4 style={{ textAlign:'left', fontWeight: 'bold', marginBottom: '20px'}}>{t('EnterCardPin')}</h4>
            
            <div style={styles.formGroupWithLabel}>
              <Field
                name="accountNumber"
                type="text"
                className="form-control"
                style={{
                  padding: '20px 12px 8px 12px', 
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f9f9f9',
                  fontSize: '16px',
                }}
                
              />
              <label 
                className="form-label"
                style={values.accountNumber ? { ...styles.formLabel, ...styles.labelFocused } : styles.formLabel}
              >
                {t('EnterAccount')}
              </label>
            </div>
            
            <div style={styles.formGroupWithLabel}>
              <Field
                as="select"
                name="bank"
                className="form-control"
                style={{
                  padding: '20px 12px 8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f9f9f9',
                  fontSize: '16px',
                }}
              >
                <option value="" disabled></option>
                <option value="우리은행">우리은행</option>
                <option value="국민은행">국민은행</option>
                <option value="신한은행">신한은행</option>
                <option value="하나은행">하나은행</option>
                <option value="농협은행">농협은행</option>
              </Field>
              <label 
                className="form-label"
                style={values.bank ? { ...styles.formLabel, ...styles.labelFocused } : styles.formLabel}
              >
                {t('PaymentBank')}
              </label>
            </div>

            <div style={styles.formGroupWithLabel}>
              <Field
                as="select"
                name="paymentDate"
                className="form-control"
                style={{
                  padding: '20px 12px 8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f9f9f9',
                  fontSize: '16px',
                }}
              >
                <option value="" disabled>선택하세요</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day.toString().padStart(2, '0')}>
                    {day.toString().padStart(2, '0')}일
                  </option>
                ))}
              </Field>
              <label 
                className="form-label"
                style={values.paymentDate ? { ...styles.formLabel, ...styles.labelFocused } : styles.formLabel}
              >
                {t('PaymentDate')}
              </label>
            </div>

            <div style={{ marginBottom: '24px', fontSize: '12px', color: '#888', textAlign:'left' }}>
              <span style={{fontWeight:'bold'}}>{t('UsagePeriod')}</span> <br />
              {t('PayPeriod1')} <br />
              {t('PayPeriod2')} 
            </div>
            
            <div style={styles.formGroupWithLabel}>
              <Field
                name="cardPassword"
                type="password"
                className="form-control"
                style={{
                  padding: '20px 12px 8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f9f9f9',
                  fontSize: '16px',
                  textAlign: 'center',
                  letterSpacing: '5px',
                }}
                maxLength="4"
              />
              <label 
                className="form-label"
                style={values.cardPassword ? { ...styles.formLabel, ...styles.labelFocused } : styles.formLabel}
              >
                {t('Pw')} 
              </label>
            </div>

            <div style={styles.formGroupWithLabel}>
              <Field
                name="cardPassword2"
                type="password"
                className="form-control"
                style={{
                  padding: '20px 12px 8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f9f9f9',
                  fontSize: '16px',
                  textAlign: 'center',
                  letterSpacing: '5px',
                }}
                maxLength="4"
              />
              <label 
                className="form-label"
                style={values.cardPassword2 ? { ...styles.formLabel, ...styles.labelFocused } : styles.formLabel}
              >
                {t('Re-enterPIN')} 
              </label>
            </div>

            <Button
              variant="primary"
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {t('Next')} 
            </Button>
          </FormikForm>
        )}
      </Formik>
      </div>
    </div>
  );
};

export default Card5;
