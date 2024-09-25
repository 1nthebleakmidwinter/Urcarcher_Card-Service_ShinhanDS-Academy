import React, { useEffect,useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "assets/Test.css";
import "./signup.css"
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';



function ConsentForm() {
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


  const navi = useNavigate();
  const [consentData, setConsentData] = useState({
    informationConsent: false,
    locationConsent: false,
    matchingConsent: false,
  });

  const [showModal, setShowModal] = useState(null); // 현재 열린 모달을 추적
  const [errorMessage, setErrorMessage] = useState("");

  // 각 약관을 본 상태를 추적
  const [viewedTerms, setViewedTerms] = useState({
    information: false,
    location: false,
    matching: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setConsentData({
      ...consentData,
      [name]: checked,
    });
  };

  const clickHandler = () => {
    if (!consentData.informationConsent) {
      setErrorMessage(t('MandatoryAgree'));
      return;
    }
    if (
      !viewedTerms.information ||
      !viewedTerms.location ||
      !viewedTerms.matching
    ) {
      setErrorMessage(t('AllAgree'));
      return;
    }
    navi("/signup/userinfo", { state: { consentData } });
  };

  const handleShowModal = (modalType) => {
    setShowModal(modalType);
    // 모달을 열 때 해당 약관에 대한 체크박스도 체크
    setConsentData(prevState => ({
      ...prevState,
      [`${modalType}Consent`]: true
    }));
  }
  const handleCloseModal = () => setShowModal(null);

  const handleModalClose = (modalType) => {
    setViewedTerms({ ...viewedTerms, [modalType]: true });
    handleCloseModal();
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
    <div className="contents">
      <div className="d-flex align-items-stretch">
        <div className="page-holder page-holder align-items-center py-4 bg-gray-100 vh-50">
          <div className="container">
            <div className="align-items-center row">
              <div className="px-lg-4 col-lg-6">
                <div className="card">
                  <div className="p-lg-5 card-body">
                    <h4 className="mb-4">{t('PrivacyPolicy')}</h4>
                    <p className="text-muted text-sm mb-3">
                    {t('Agree')}
                    </p>
                    <hr></hr>

                    <div className="mb-3 form-check form-box">
                      
                      <input
                        type="checkbox"
                        name="informationConsent"
                        className="form-check-input"
                        checked={consentData.informationConsent}
                        onChange={handleChange}
                      />

                      <div className="form-first">
                      <p className="form-check-label">
                      
                      &nbsp;{t('Collection')}&nbsp;
                      </p>   
                      {/*  */}
                      <button
                        className="custom-link-button"
                        onClick={() => handleShowModal("information")}
                      >
                        {t('Look')}
                      </button>

                      </div>
                    </div>
                    <div className="mb-3 form-check form-box">
                      <input
                        type="checkbox"
                        name="locationConsent"
                        className="form-check-input"
                        checked={consentData.locationConsent}
                        onChange={handleChange}
                      />
                      <div className="form-first">
                      <p className="form-check-label">
                      
                      &nbsp; {t('ConsentLocation')}&nbsp;
                      </p>
                      
                    
                      <button
                        class="custom-link-button"
                        onClick={() => handleShowModal("location")}
                      >
                        {t('Look')}
                      </button>
                      </div>
                    </div>
                    <div className="mb-3 form-check form-box">
                      <input
                        type="checkbox"
                        name="matchingConsent"
                        className="form-check-input"
                        checked={consentData.matchingConsent}
                        onChange={handleChange}
                      />
                      <div className="form-first">
                      <p className="form-check-label">
                      
                      &nbsp;{t('ConsentMatching')}&nbsp;
                      </p>
                     
                      <button
                        class="custom-link-button"
                        onClick={() => handleShowModal("matching")}
                      >
                        {t('Look')}
                      </button>
                      </div>
                    </div>

                    {errorMessage && (
                      <p style={{ color: "red" }}>{errorMessage}</p>
                    )}

                    <Button className="my-btn" onClick={clickHandler}>
                    {t('Next')}
                    </Button>
                  </div>
                  <div className="px-lg-5 py-lg-4 card-footer">
                    <div className="text-sm text-muted">
                    {t('AreadyAccount')}
                      <a href="/login"> {" " + t('Login2')}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

<div className="signupModal">
      {/* 개인정보 수집 및 이용 약관 모달 */}
      <Modal
        show={showModal === "information"}
        onHide={() => handleModalClose("information")}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('privacy_policy_title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{t('purpose_title')}</h4>
          <p>
          {t('privacy_policy_purpose')}
          </p>
<br></br>
          <h4>{t('collected_info_title')}</h4>
          <p> {t('collected_info_description')}</p>
          <ul style={{margin:'0 0 10px', padding:'0'}}>
            <li> &nbsp; &nbsp; ⦁ {t('collected_info_item_1')}</li>
            <li>&nbsp; &nbsp; ⦁ {t('collected_info_item_2')}</li>
          </ul>
<br></br>
          <h4>{t('usage_purpose_title')}</h4>
          <p>{t('usage_purpose_description')}</p>
          <ul style={{margin:'0 0 10px', padding:'0'}}>
            <li>&nbsp;&nbsp;  ⦁ {t('usage_purpose_item_1')}</li>
            <li>&nbsp;&nbsp;  ⦁ {t('usage_purpose_item_2')}</li>
          </ul>
<br></br>
          <h4>{t('retention_period_title')}</h4>
          <p>
          {t('retention_period_description')}
          </p>
<br></br>
          <h4>{t('consent_refusal_title')}</h4>
          <p>
          {t('consent_refusal_description')}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleModalClose("information")}
          >
            {t('Close')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 위치정보 이용 동의 약관 모달 */}
      <Modal
        show={showModal === "location"}
        onHide={() => handleModalClose("location")}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('location_policy_title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{t('location_purpose_title')}</h4>
          <p>
          {t('location_purpose_description')}
          </p>

          <h4>{t('location_info_title')}</h4>
          <p>{t('location_info_description')}</p>
          <ul style={{margin:'0 0 10px', padding:'0'}}>
            <li> ⦁ {t('location_info_item_1')}</li>
          </ul>

          <h4> {t('location_usage_purpose_title')}</h4>
          <p> {t('location_usage_purpose_description')}</p>
          <ul style={{margin:'0 0 10px', padding:'0'}}>
            <li>&nbsp; &nbsp; ⦁ {t('location_usage_purpose_item_1')}</li>
            <li>&nbsp; &nbsp; ⦁ {t('location_usage_purpose_item_2')}</li>
            <li>&nbsp; &nbsp; ⦁ {t('location_usage_purpose_item_3')}</li>
          </ul>

          <h4>{t('location_retention_period_title')}</h4>
          <p>
          {t('location_retention_period_description')}
          </p>

          <h4>{t('location_consent_refusal_title')}</h4>
          <p>
          {t('location_consent_refusal_description')}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleModalClose("location")}
          >
            {t('Close')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 매칭 서비스 활용 동의 약관 모달 */}
      <Modal
        show={showModal === "matching"}
        onHide={() => handleModalClose("matching")}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('matching_policy_title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{t('matching_purpose_title')}</h4>
          <p>
          {t('matching_purpose_description')}
          </p>

          <h4>{t('matching_info_title')}</h4>
          <p>{t('matching_info_description')}</p>
          <ul style={{margin:'0 0 10px', padding:'0'}}>
            <li>&nbsp; &nbsp; ⦁ {t('matching_info_item_1')}</li>
            <li>&nbsp; &nbsp; ⦁ {t('matching_info_item_2')}</li>
          </ul>

          <h4>{t('matching_usage_purpose_title')}</h4>
          <p>{t('matching_usage_purpose_description')}</p>
          <ul style={{margin:'0 0 10px', padding:'0'}}>
            <li>&nbsp; &nbsp; ⦁ {t('matching_usage_purpose_item_1')}</li>
            <li>&nbsp; &nbsp; ⦁ {t('matching_usage_purpose_item_2')}</li>
            <li>&nbsp; &nbsp; ⦁ {t('matching_usage_purpose_item_3')}</li>
          </ul>

          <h4>{t('matching_retention_period_title')}</h4>
          <p>
          {t('matching_retention_period_description')}
          </p>

          <h4>{t('matching_consent_refusal_title')}</h4>
          <p>
          {t('matching_consent_refusal_description')}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleModalClose("matching")}
          >
            {t('Close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
}

export default ConsentForm;
