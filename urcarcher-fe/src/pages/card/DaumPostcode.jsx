import React, { useEffect, useState } from 'react';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { Modal, Button } from 'react-bootstrap';
import 'assets/Language.css';

const DaumPostcode = ({ setFieldValue }) => {
    const { t, i18n } = useTranslation();
    const [showModal, setShowModal] = useState(false); // 모달 상태 관리

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

    useEffect(() => {
        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage);
        } else {
            changeLanguage('Korea');
        }

        const script = document.createElement('script');
        script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${extraAddress}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setFieldValue("address", fullAddress); // 기본 주소를 Formik의 Field 값으로 설정
        setFieldValue("detailAddress", ""); // 상세 주소 초기화
        setShowModal(false); // 주소 선택 후 모달 닫기
    };

    const openPostcode = () => {
        new window.daum.Postcode({
            oncomplete: handleComplete,
            width: '100%',  // API가 모달의 너비에 맞춰 표시되도록 설정
            height: '100%', // API 높이를 모달의 높이에 맞춤
        }).embed(document.getElementById('postcode-container')); // 모달 안에 embed
    };

    const handleClick = () => {
        setShowModal(true); // 모달 열기
    };

    return (
        <div>
            <button type="button" onClick={handleClick}
             style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px',
                display: 'flex', justifyContent: 'flex-start'
              }}>
                {t('AddressSearch')}
            </button>
            <Field
                id="address"
                name="address"
                className="form-control"
                style={{
                    padding: '12px 12px 8px 12px',
                    fontSize: '14px',
                    color: '#333',
                    borderColor: '#ced4da',
                    marginBottom: '12px'
                }}
                placeholder={t('PrimaryAddress')}
            />
            <Field
                id="detailAddress"
                name="detailAddress"
                className="form-control"
                style={{
                    padding: '12px 12px 8px 12px',
                    fontSize: '14px',
                    color: '#333',
                    borderColor: '#ced4da',
                }}
                placeholder={t('DetailedAddress')}
            />

            {/* 주소 검색창을 띄울 모달 */}
            <Modal 
                show={showModal} 
                onHide={() => setShowModal(false)} 
                onShow={openPostcode}
                size="lg" // 모달을 큰 크기로 설정
                aria-labelledby="contained-modal-title-vcenter"
                centered // 화면 중앙에 모달 위치
                dialogClassName="postcode-modal" // 모달 크기 제어를 위한 클래스 추가
            >
                <Modal.Body style={{ padding: '0', margin: '0', height: '100%', width: '100%' }}> {/* 모든 여백 제거 */}
                    <div id="postcode-container" style={{ width: '100%', height: '100%' }}></div> {/* Daum 주소 검색창을 여기 embed */}
                </Modal.Body>
            </Modal>

            {/* 커스텀 CSS로 .modal-content의 높이 강제 조정 */}
            <style>
                {`
                    .postcode-modal .modal-content {
                        height: 500px;  /* 원하는 높이로 설정 */
                    }
                `}
            </style>
        </div>
    );
};

export default DaumPostcode;
