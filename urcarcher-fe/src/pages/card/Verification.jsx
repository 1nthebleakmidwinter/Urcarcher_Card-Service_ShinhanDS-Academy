import CardOverlay from 'bootstrap-template/components/cards/CardOverlay';
import { Formik, Form as FormikForm, Field } from "formik";
import React from 'react';
import { Button, Form, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';
import { useEffect, useState } from 'react';

function Verification() {

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

    useEffect(()=>{
   
        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }
    },[]);


    let navigate = useNavigate();

    return (
        <div style={{ marginTop: '140px'}}>
              <ProgressBar
                stages={['카드 선택', '정보 입력', '동의 사항', '카드 수령', '결제 정보']}
                currentStage={'정보 입력'}
            />
        <Container>
          
            <div >
            <Tabs
                defaultActiveKey="driver's license"
                id="fill-tab-example"
                className="mb-3"
                fill
                >
                <Tab eventKey="driver's license" title={t('DriverLicense')}>
                    <br/>
                    <CardOverlay
                        className="my-custom-class"
                        img={'/img/cert_drive.png'}
                        style={{fontSize:'0px'}}
                    />
                    {/* <br/> */}
                    <br/>
                    <Formik
                        initialValues={{ cert_drive: '', cert_idCard: '', cert_foriCard1: '', cert_foriCard2: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                            navigate('/card3');
                        }}
                    >
                        <FormikForm>
                            <Row>
                                <SmallSelect aria-label="Default select example">
                                    <option>{t('Select')}</option>
                                    <option value="11">11-서울</option>
                                    <option value="12">12-부산</option>
                                    <option value="13">13-경기</option>
                                    <option value="14">14-강원</option>
                                    <option value="15">15-충북</option>
                                    <option value="16">16-충남</option>
                                    <option value="17">17-전북</option>
                                    <option value="18">18-전남</option>
                                    <option value="19">19-경북</option>
                                    <option value="20">20-경남</option>
                                    <option value="21">21-제주</option>
                                    <option value="22">22-대구</option>
                                    <option value="23">23-인천</option>
                                    <option value="24">24-광주</option>
                                    <option value="25">25-대전</option>
                                    <option value="26">26-울산</option>
                                    <option value="28">28-없음</option>
                                </SmallSelect>
                                <div className="mb-3" style={{ flex: 1 }}>
                                    <FullWidthInput
                                        id="cert_drive"
                                        name="cert_drive"
                                        type="text"
                                        placeholder={t('EnterLicenseNumber')}
                                        className="form-control"
                                    />
                                </div>
                            </Row>
                            <br/>
                        </FormikForm>
                    </Formik>
                    <p style={{fontWeight:'bold', textAlign:'left', margin:'0'}}>{t('SelectRegionOrFirstTwoDigits')}</p>
                    <p style={{color:'red', fontWeight:'bold', textAlign:'left'}}>{t('RegionSelectionRequired')}</p>
                </Tab>
                <Tab eventKey="ID Card" title={t('ResidentRegistrationCard')}>
                    <br/>
                    <CardOverlay
                        className="my-custom-class"
                        img={'/img/cert_jumin.png'}
                        style={{fontSize:'0px'}}
                    />
                    {/* <br/> */}
                    <br/>
                    <Formik
                        initialValues={{ cert_drive: '', cert_idCard: '', cert_foriCard1: '', cert_foriCard2: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                            navigate('/card3');
                        }}
                    >
                        <FormikForm>
                            <div className="mb-3">
                                <Form.Label className="text-uppercase" htmlFor="cert_idCard">
                                {t('EnterIssueDate')}
                                </Form.Label>
                                <Field
                                    id="cert_idCard"
                                    name="cert_idCard"
                                    type="text"
                                    placeholder= {t('PleaseEnterIssueDate')}
                                    className="form-control"
                                />
                            </div>
                            {/* <br/> */}
                        </FormikForm>
                    </Formik>
                </Tab>
                <Tab eventKey="alien registration card" title={t('ForeignerRegistrationCard')}>
                    <br/>
                    <CardOverlay
                        className="my-custom-class"
                        img={'/img/cert_foriCard.png'}
                        style={{fontSize:'0px'}}
                    />
                    {/* <br/> */}
                    <br/>
                    <Formik
                        initialValues={{ cert_drive: '', cert_idCard: '', cert_foriCard1: '', cert_foriCard2: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                            navigate('/card3');
                        }}
                    >
                        <FormikForm>
                            <div className="mb-3">
                                <Form.Label className="text-uppercase" htmlFor="cert_foriCard1">
                                {t('EnterIssueDate')}
                                </Form.Label>
                                <Field
                                    id="cert_foriCard1"
                                    name="cert_foriCard1"
                                    type="text"
                                    placeholder={t('PleaseEnterIssueDate')}
                                    className="form-control"
                                />
                            </div>
                            <br/>
                            <div className="mb-3">
                                <Form.Label className="text-uppercase" htmlFor="cert_foriCard2">
                                {t('EnterSerialNumber')}
                                </Form.Label>
                                <Field
                                    id="cert_foriCard2"
                                    name="cert_foriCard2"
                                    type="text"
                                    placeholder={t('PleaseEnterSerialNumber')}
                                    className="form-control"
                                />
                            </div>
                        </FormikForm>
                    </Formik>
                </Tab>
            </Tabs>
            <br/>
            <Button
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
                onClick={()=>{
                    navigate('/card3');
                }}
                >
            {t('VerifyIDCard')}
            </Button>
            </div>
        </Container>
        
        </div>
    );
}
const Container = styled.div`
  width: 100%;
  padding: 0 20px;
  margin: 50px auto;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const SmallSelect = styled(Form.Select)`
  width: 100px;
  transform: translateY(-8px);
`;
const FullWidthInput = styled(Field)`
  flex: 1;
`;
export default Verification;
