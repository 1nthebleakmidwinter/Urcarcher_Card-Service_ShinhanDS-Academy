import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, Field } from 'formik';
import ProgressBar from './ProgressBar';
import { Button } from 'react-bootstrap';
import { useCardContext } from './CardContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import DaumPostcode from './DaumPostcode';  // 주소 컴포넌트 import
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';

const CardForm = () => {
  const { produceCardOffer, setProduceCardOffer } = useCardContext();
  let navigate = useNavigate();

  const [pickupMethod, setPickupMethod] = useState('address'); // 초기값은 'address'
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

  useEffect(() => {
    const savedLanguage = Cookies.get('selectedLanguage');
    if (savedLanguage) {
      changeLanguage(savedLanguage); // 언어 변경
    } else {
      changeLanguage('Korea'); // 기본 언어 설정
    }
  }, []);

  // 오늘 날짜를 구함
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div style={{ marginTop: '140px'}}>
      <ProgressBar
        stages={['카드 선택', '정보 입력', '동의 사항', '카드 수령', '결제 정보']}
        currentStage={'카드 수령'}
      />
      <Formik
        initialValues={{
          address: "",
          detailAddress: "",
          date: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          const fullAddress = `${values.address} ${values.detailAddress}`;
          setProduceCardOffer(prevState => ({
            ...prevState,
            card_pickup: pickupMethod === 'address' ? fullAddress : '공항 수령', // 공항 수령 선택 시 '공항 수령'으로 설정
            pickup_date: values.date  // 날짜를 pickup_date에 할당
          }));

          if (produceCardOffer.card_type_id === 1 || produceCardOffer.card_type_id === 2){
            setTimeout(() => navigate('/card5'), 300);
          } else {
            setTimeout(() => navigate('/cardPass'), 300);
          }
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <FormikForm onSubmit={handleSubmit} style={{margin: 'auto 50px' }}>
            <h4 style={{ marginTop: '60px', textAlign:'left', fontWeight: 'bold'}}>{t('AllSet')}</h4>
            <h4 style={{ textAlign:'left', fontWeight: 'bold' }}>{t('EnterReceipt')}</h4>
            <br/>

            <div style={{ marginBottom: '24px',  textAlign:'left' }}>
              <div style={{marginBottom: '8px'}}>{t('CardPickUp')}</div>
              <label>
                <Field 
                  type="radio" 
                  name="pickupMethod" 
                  value="address" 
                  checked={pickupMethod === 'address'} 
                  onChange={() => setPickupMethod('address')}
                /> 
                &nbsp;{t('AtAddress')}
              </label>
              <label style={{ marginLeft: '20px' }}>
                <Field 
                  type="radio" 
                  name="pickupMethod" 
                  value="airport" 
                  checked={pickupMethod === 'airport'} 
                  onChange={() => setPickupMethod('airport')}
                /> 
                &nbsp;{t('AtAirport')}
              </label>
            </div>

            {pickupMethod === 'address' && (
              <div style={styles.formGroupWithLabel}>
                <DaumPostcode setFieldValue={setFieldValue} />
                <label 
                  className="form-label"
                  style={values.address ? { ...styles.formLabel, ...styles.labelFocused } : styles.formLabel}
                >
                  {/* 카드 수령처 */}
                </label>
              </div>
            )}

            <div style={styles.formGroupWithLabel}>
              <Field
                id="date"
                name="date"
                type="date"
                className="form-control"
                style={{
                  padding: '40px 12px 8px 12px',
                  fontSize: '14px',
                  color: '#333',
                  borderColor: '#ced4da',
                }}
                min={getTodayDate()}  // 오늘 이전 날짜 선택 불가
              />
              <label 
                className="form-label"
                style={values.date ? { ...styles.formLabel, ...styles.labelFocused } : styles.formLabel}
              >
                {t('SelectDate')}
              </label>
            </div>

            <div className="mb-3">
              <Button variant="primary" type="submit" style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                marginTop: '20px'
              }}>
                {t('Next')}
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default CardForm;
