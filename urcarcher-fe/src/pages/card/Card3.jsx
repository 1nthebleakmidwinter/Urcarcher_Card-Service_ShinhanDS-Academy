import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';


function Card3() {

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


    const [formData, setFormData] = useState({
        serviceTOS: false,
        personalTOS: false,
        marketingTOS: false,
        thirdPartyTOS: false,
    });

    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {

        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }


        updateButtonState();
    }, [formData]);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const updateButtonState = () => {
        const allRequiredChecked = Object.values(formData).every(value => value === true);
        setButtonEnabled(allRequiredChecked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (buttonEnabled) {
            setTimeout(() => navigate('/card4'), 300);
        } else {
            alert(t('AllAgree'));
        }
    };

    const openModal = (content) => {
        const modalContents = {
            serviceTOS: `
            <h4 style="text-align: left;">${t('privacy_collection_agreement_title')}</h4>
        <p style="text-align: left;">${t('privacy_collection_agreement_description')}</p>
        <h5 style="text-align: left;">${t('privacy_collection_items_title')}</h5>
        <ul style="text-align: left;">
            <li>• ${t('privacy_collection_item_1')}</li>
            <li>• ${t('privacy_collection_item_2')}</li>
        </ul>
        <h5 style="text-align: left;">${t('privacy_usage_purpose_title')}</h5>
        <ul style="text-align: left;">
            <li>• ${t('privacy_usage_purpose_item_1')}</li>
            <li>• ${t('privacy_usage_purpose_item_2')}</li>
            <li>• ${t('privacy_usage_purpose_item_3')}</li>
            <li>• ${t('privacy_usage_purpose_item_4')}</li>
        </ul>
        <h5 style="text-align: left;">${t('privacy_retention_period_title')}</h5>
        <ul style="text-align: left;">
            <li>• ${t('privacy_retention_period_item_1')}</li>
            <li>• ${t('privacy_retention_period_item_2')}</li>
        </ul>
        <h5 style="text-align: left;">${t('privacy_consent_refusal_title')}</h5>
        <p style="text-align: left;">${t('privacy_consent_refusal_description')}</p>
        `,
        personalTOS: `
        <h4 style="text-align: left;">${t('unique_identifier_agreement_title')}</h4>
        <p style="text-align: left;">${t('unique_identifier_agreement_description')}</p>
        <h5 style="text-align: left;">${t('unique_identifier_items_title')}</h5>
        <ul style="text-align: left;">
            <li>• ${t('unique_identifier_item_1')}</li>
        </ul>
        <h5 style="text-align: left;">${t('unique_identifier_purpose_title')}</h5>
        <ul style="text-align: left;">
            <li>• ${t('unique_identifier_purpose_item_1')}</li>
            <li>• ${t('unique_identifier_purpose_item_2')}</li>
            <li>• ${t('unique_identifier_purpose_item_3')}</li>
        </ul>
        <h5 style="text-align: left;">${t('unique_identifier_retention_period_title')}</h5>
        <ul style="text-align: left;">
            <li>• ${t('unique_identifier_retention_period_item_1')}</li>
            <li>• ${t('unique_identifier_retention_period_item_2')}</li>
        </ul>
        <h5 style="text-align: left;">${t('unique_identifier_consent_refusal_title')}</h5>
        <p style="text-align: left;">${t('unique_identifier_consent_refusal_description')}</p>
        `,
        marketingTOS: `
        <h4 style="text-align: left;">${t('marketing_agreement_title')}</h4>
        <p style="text-align: left;">${t('marketing_agreement_description')}</p>
        <h5 style="text-align: left;">${t('marketing_collection_items_title')}</h5>
        <ul style="text-align: left;">
            <li>• ${t('marketing_collection_item_1')}</li>
        </ul>
        <h5 style="text-align: left;">${t('marketing_usage_purpose_title')}</h5>
        <ul style="text-align: left;">
            <li>• ${t('marketing_usage_purpose_item_1')}</li>
            <li>• ${t('marketing_usage_purpose_item_2')}</li>
            <li>• ${t('marketing_usage_purpose_item_3')}</li>
        </ul>
        <h5 style="text-align: left;">${t('marketing_retention_period_title')}</h5>
        <ul style="text-align: left;">
            <li>• ${t('marketing_retention_period_item_1')}</li>
        </ul>
        <h5 style="text-align: left;">${t('marketing_consent_refusal_title')}</h5>
        <p style="text-align: left;">${t('marketing_consent_refusal_description')}</p>
        `,
        thirdPartyTOS: `
        <h4 style="text-align: left;">${t('third_party_agreement_title')}</h4>
        <p style="text-align: left;">${t('third_party_agreement_description')}</p>
        <h5 style="text-align: left;">${t('third_party_provision_items_title')}</h5>
        <ul style="text-align: left;">
            <li>• ${t('third_party_provision_item_1')}</li>
            <li>• ${t('third_party_provision_item_2')}</li>
        </ul>
        <h5 style="text-align: left;">${t('third_party_provided_items_title')}</h5>
        <ul style="text-align: left;">
            <li>• ${t('third_party_provided_item_1')}</li>
        </ul>
        <h5 style="text-align: left;">${t('third_party_provision_purpose_title')}</h5>
        <ul style="text-align: left;">
            <li>• ${t('third_party_provision_purpose_item_1')}</li>
            <li>• ${t('third_party_provision_purpose_item_2')}</li>
            <li>• ${t('third_party_provision_purpose_item_3')}</li>
        </ul>
        <h5 style="text-align: left;">${t('third_party_retention_period_title')}</h5>
        <ul style="text-align: left;">
            <li>• ${t('third_party_retention_period_item_1')}</li>
        </ul>
        <h5 style="text-align: left;">${t('third_party_consent_refusal_title')}</h5>
        <p style="text-align: left;">${t('third_party_consent_refusal_description')}</p>
        `,
    };

        setModalContent(modalContents[content]);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
    };

    return (
        <div style={{ marginTop: '140px' }}>
            <ProgressBar
                stages={['카드 선택', '정보 입력', '동의 사항', '카드 수령', '결제 정보']}
                currentStage={'동의 사항'}
            />

            <div style={{ margin: 'auto 50px' }}>
                <div className="text-center" style={{ marginBottom: '50px' }}>
                    <h4 style={{ marginTop: '65px', textAlign: 'left' }}>{t('CardIssuance')}</h4>
                    <p style={{ color: '#6c757d', textAlign: 'left' }}>
                    {t('AgreeVerification')}
                    </p>
                </div>

                <form id="agreementForm" onSubmit={handleSubmit}>
                    <div className="terms">
                        <div className="d-flex justify-content-between align-items-center my-2">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="serviceTOS"
                                    checked={formData.serviceTOS}
                                    onChange={handleCheckboxChange}
                                    required
                                />
                                <label className="form-check-label">
                                {t('Collection')}
                                </label>
                            </div>
                            <Button variant="link" size="sm" onClick={() => openModal('serviceTOS')} style={{ color: '#476EFF' }}>{t('Look')}</Button>
                        </div>
                        <div className="d-flex justify-content-between align-items-center my-2">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="personalTOS"
                                    checked={formData.personalTOS}
                                    onChange={handleCheckboxChange}
                                    required
                                />
                                <label className="form-check-label">
                                {t('ConsentIdentifying')}
                                </label>
                            </div>
                            <Button variant="link" size="sm" onClick={() => openModal('personalTOS')} style={{ color: '#476EFF' }}>{t('Look')}</Button>
                        </div>
                        <div className="d-flex justify-content-between align-items-center my-2">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="marketingTOS"
                                    checked={formData.marketingTOS}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">
                                {t('ConsentMarketing')}
                                </label>
                            </div>
                            <Button variant="link" size="sm" onClick={() => openModal('marketingTOS')} style={{ color: '#476EFF' }}>{t('Look')}</Button>
                        </div>
                        <div className="d-flex justify-content-between align-items-center my-2">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="thirdPartyTOS"
                                    checked={formData.thirdPartyTOS}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label">
                                {t('ConsentInformation')}
                                </label>
                            </div>
                            <Button variant="link" size="sm" onClick={() => openModal('thirdPartyTOS')} style={{ color: '#476EFF' }}>{t('Look')}</Button>
                        </div>
                    </div>
                    <div className="text-center mt-4" style={{}}>
                        <Button type="submit" variant="primary" size="lg" disabled={!buttonEnabled} style={{
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
                </form>
            </div>

            <Modal show={isModalOpen} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('TAC')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div dangerouslySetInnerHTML={{ __html: modalContent }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                    {t('Next')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Card3;
