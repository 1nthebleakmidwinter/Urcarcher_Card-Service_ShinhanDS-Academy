import React, { useEffect, useState } from 'react';
import { Formik, Form as FormikForm, Field } from "formik";
import { Form, Button, Modal } from "react-bootstrap"; // Modal 추가
import Axios from 'axios';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';

function SettingPassword(props) {

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

    const [isVerified, setIsVerified] = useState(false);  // 비밀번호 검증 상태를 저장
    const [showModal, setShowModal] = useState(false);  // 모달 상태
    const [modalMessage, setModalMessage] = useState('');  // 모달 메시지 상태

    // 현재 비밀번호 확인 함수
    const verifyCurrentPassword = async (password) => {
        return true;  // 실제 검증에서는 DB 값과 비교해야 함 -- 일단은 true로 설정해놓음
    };

    const handleVerifyPassword = async (values) => {
        if (!values.currentPassword) {
            setModalMessage(t('EnterPIN2'));
            setShowModal(true);
            setTimeout(() => setShowModal(false), 2000); // 2초 후 모달 자동 닫기
        } else if (values.currentPassword.length !== 4) {
            setModalMessage(t('PINMustBe4Digits'));
            setShowModal(true);
            setTimeout(() => setShowModal(false), 2000); // 2초 후 모달 자동 닫기
        } else {
            Axios.post('/api/card/checkpinnumber', {
                cardId: String(props.card.cardId),
                pinNumber: String(values.currentPassword)
            })
            .then((response) => {
                setIsVerified(true);
            })
            .catch(() => {
                setIsVerified(false);
                setModalMessage(t('CurrentPINNotMatching'));
                setShowModal(true);
                setTimeout(() => setShowModal(false), 2000); // 2초 후 모달 자동 닫기
            });
        }
    };

    useEffect(() => {
        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }
    }, []);

    return (
        <div>
            {!isVerified ? (
                <Formik
                    initialValues={{ currentPassword: "" }}
                    onSubmit={handleVerifyPassword}
                >
                    <FormikForm>
                        <div className="mb-3">
                            <Form.Label className="text-uppercase" htmlFor="currentPassword">
                            {t('EnterCurrentPIN')}
                            </Form.Label>
                            <Field
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                placeholder="Current Password"
                                className="form-control"
                                maxLength="4"
                            />
                        </div>
                        <div className="mb-3">
                            <Button variant="primary" type="submit">
                            {t('ConfirmPIN')}
                            </Button>
                        </div>
                    </FormikForm>
                </Formik>
            ) : (
                <Formik
                    key={isVerified}
                    initialValues={{
                        password1: "",
                        password2: "",
                    }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));

                        if (!values.password1 || !values.password2) {
                            setModalMessage(t('EnterAllPIN'));
                            setShowModal(true);
                            setTimeout(() => setShowModal(false), 2000); // 2초 후 모달 자동 닫기
                        } else if (values.password1 !== values.password2) {
                            setModalMessage(t('EnterAllPIN'));
                            setShowModal(true);
                            setTimeout(() => setShowModal(false), 2000); // 2초 후 모달 자동 닫기
                        } else if (values.password1.length !== 4 || values.password2.length !== 4) {
                            setModalMessage(t('PINMustBe4Digits'));
                            setShowModal(true);
                            setTimeout(() => setShowModal(false), 2000); // 2초 후 모달 자동 닫기
                        } else {
                            Axios.post('/api/card/changepinnumber', {
                                cardId: String(props.card.cardId),
                                pinNumber: String(values.password1)
                            })
                            .then(() => {
                                setModalMessage(t('PINChangeSuccess'));
                                setShowModal(true);
                                setTimeout(() => {
                                    setShowModal(false);
                                    props.setShowModal(false);
                                }, 2000); // 2초 후 모달 자동 닫기
                            })
                            .catch(() => {
                                setModalMessage(t('PINChangeFailure'));
                                setShowModal(true);
                                setTimeout(() => setShowModal(false), 2000); // 2초 후 모달 자동 닫기
                            });
                        }
                    }}
                >
                    <FormikForm>
                        <div className="mb-3">
                            <Form.Label className="text-uppercase" htmlFor="password1">
                            {t('EnterNewPIN')}
                            </Form.Label>
                            <Field
                                id="password1"
                                name="password1"
                                type="password"
                                placeholder="New Password"
                                className="form-control"
                                maxLength="4"
                            />
                        </div>

                        <div className="mb-3">
                            <Form.Label className="text-uppercase" htmlFor="password2">
                            {t('ReEnterNewPIN')}
                            </Form.Label>
                            <Field
                                id="password2"
                                name="password2"
                                type="password"
                                placeholder="Again New Password"
                                className="form-control"
                                maxLength="4"
                            />
                        </div>
                        <div className="mb-3">
                            <Button variant="primary" type="submit">
                            {t('ChangePIN')}
                            </Button>
                        </div>
                    </FormikForm>
                </Formik>
            )}

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
        </div>
    );
}

export default SettingPassword;
