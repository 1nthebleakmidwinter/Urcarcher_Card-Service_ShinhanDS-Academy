import React, { useEffect, useState } from 'react';
import { Input, Switch, FormControlLabel, Button } from '@mui/material';
import { useCardContext } from './CardContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProgressBar from './ProgressBar';
import Axios from 'axios';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { Modal } from 'react-bootstrap';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';

function Card2() {
    const [idNum, setIdNum] = useState('');
    const [maskingNum, setMaskingNum] = useState('');
    const [postPaidTransport, setPostPaidTransport] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [name, setName] = useState('');
    const [memberId, setMemberId] = useState('');

    const { produceCardOffer, setProduceCardOffer } = useCardContext();
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [isVerificationSuccessful, setIsVerificationSuccessful] = useState(null);
    const [showModal, setShowModal] = useState(false); // 모달 상태 추가
    const [modalMessage, setModalMessage] = useState(''); // 모달에 표시될 메시지
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

    let navigate = useNavigate();

    useEffect(() => {
        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage);
        } else {
            changeLanguage('Korea');
        }

        Axios.get('/api/t/test')
        .then((response) => {
            const memberData = response.data;
            setPhoneNumber(memberData.phoneNumber);
            setRegistrationNumber(memberData.registrationNumber);
            setName(memberData.name);
            setMemberId(memberData.memberId);
        })
        .catch(error => {
            console.error('Error fetching member data:', error);
        });
    }, []);

    const handleIdNumChange = (event) => {
        const originalValue = event.target.value.replace(/[^0-9]/g, '');
        const formattedValue = originalValue.replace(/^(\d{0,6})(\d{0,7})$/g, '$1-$2').replace(/-{1,2}$/g, '');
        setIdNum(formattedValue);

        if (originalValue.length > 6) {
            const masked = originalValue.replace(/(\d{6})(\d{1})(\d{6})/, '$1-$2******');
            setMaskingNum(masked);
        } else {
            setMaskingNum(formattedValue);
        }
    };

    const handleSwitchChange = (event) => {
        setPostPaidTransport(event.target.checked);
    };

    const handleVerificationRequest = () => {
        axios.post('/send-one', { phoneNumber })
            .then(response => {
                setIsVerificationSent(true);
            })
            .catch(error => {
                console.error('인증번호 발송 실패:', error);
            });
    };

    const handleVerificationCodeChange = (event) => {
        setVerificationCode(event.target.value);
    };

    const handleVerificationSubmit = () => {
        axios.post('/verify-code', { phoneNumber, verificationCode })
            .then(response => {
                setIsVerificationSuccessful(response.data);
                if (response.data) {
                    setModalMessage('인증 성공!');
                } else {
                    setModalMessage('인증 실패! 다시 시도해주세요.');
                }
                setShowModal(true); // 모달 창 표시
            })
            .catch(error => {
                console.error('인증 실패:', error);
            });
    };

    const handleCloseModal = () => {
        setShowModal(false); // 모달 창 닫기
    };

    const handleSubmit = () => {
        const cardData = {
            idNum,
            postPaidTransport,
        };

        setProduceCardOffer(prevState => ({
            ...prevState,
            member_id: memberId,
            transportation: postPaidTransport
        }));

       if (!registrationNumber) {
        // registrationNumber가 null 또는 빈 문자열이면 /card3으로 이동
        setTimeout(() => navigate('/card3'), 300);
        } else if (produceCardOffer.card_type_id === 1 || produceCardOffer.card_type_id === 2) {
            setTimeout(() => navigate('/verification'), 300);
        } else {
            setTimeout(() => navigate('/card3'), 300);
        }
    };

    return (
        <div style={{ marginTop: '140px'}}>
             <ProgressBar stages={['카드 선택', '정보 입력', '동의 사항', '카드 수령', '결제 정보']} currentStage={'정보 입력'} />
            <div className="submit-container" id="regist-container" style={{ margin: 'auto 50px'}}>
                <h4 style={{marginTop: '65px', textAlign:'left', marginBottom: '30px'}}>{t('VerifyInfo')}</h4>
                <div style={{ marginBottom: '30px'}}>
                    <div style={{ justifyContent: 'flex-start', display: 'flex' }}>{t('Name')}</div>
                    <Input
                        id="name"
                        placeholder={t('EnterName')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%' }}
                    />
                    <br />
                </div>

                <div>
                    <div style={{ justifyContent: 'flex-start', display: 'flex' }}>{t('PhoneNumber')}</div>
                    <Input
                        id="phone"
                        placeholder={t('EnterPhoneNumber')}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        style={{ width: '100%' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleVerificationRequest}
                        style={{position:'relative', left:'134px',bottom:'35px'}}
                    >
                        {t('Verify')}
                    </Button>
                    <br />
                </div>

                {isVerificationSent && (
                    <div style={{ marginBottom: '30px' }}>
                        <div style={{ justifyContent: 'flex-start', display: 'flex' }}>{t('EnterVerify')}</div>
                        <Input
                            id="verification-code"
                            placeholder={t('EnterVerify2')}
                            value={verificationCode}
                            onChange={handleVerificationCodeChange}
                            style={{ width: '80%' }}
                        />
                        <Button variant="contained" color="primary" onClick={handleVerificationSubmit}>
                            {t('Confrim')} 
                        </Button>
                    </div>
                )}

                {registrationNumber && (
                    <div style={{ marginBottom: '30px' }}>
                        <div style={{ justifyContent: 'flex-start', display: 'flex' }}>{t('RegistrationNumber')}</div>
                        <Input
                            placeholder={t('EnterNumber')}
                            maxLength={14}
                            value={maskingNum || registrationNumber}
                            onChange={handleIdNumChange}
                            style={{ width: '100%' }}
                        />
                    </div>
                )}

                <div style={{ justifyContent: 'flex-start', display: 'flex',  marginBottom: '30px'}}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={postPaidTransport}
                                onChange={handleSwitchChange}
                                name="postPaidTransport"
                                color="primary"
                                style={{ marginLeft: '0 !important' }}
                            />
                        }
                        label={t('ApplyPostpaid')}
                        labelPlacement="start" // 라벨을 스위치 앞에 위치시킴
                        style={{ marginLeft: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
                    />
                </div>

                <Button
                    variant="contained"
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
                    onClick={handleSubmit}
                >
                    {t('Next')}
                </Button>
            </div>

            {/* 모달 컴포넌트 */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('Verification')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        {t('Confrim')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Card2;
