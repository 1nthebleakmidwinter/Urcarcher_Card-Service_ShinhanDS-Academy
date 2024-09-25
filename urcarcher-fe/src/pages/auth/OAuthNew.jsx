import React, { useEffect, useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "pages/auth/OAuthNew.css";
import { oauthNew } from 'services/AuthService';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';

function OAuthNew(props) {
  var loc = useLocation();
  const nav = useNavigate();
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


  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(null); // 현재 열린 모달을 추적
  const [errorMessage, setErrorMessage] = useState("");

  const [gotForeignReg, setGotForeignReg] = useState(false);

  const [userInfo, setUserInfo] = useState({
    registrationNumber: '',
    registrationNumber6: '',
    registrationNumber7: '',
    gender: '',
    nationality: '',
    phoneNumber: '',
    informationConsent: false,
    locationConsent: false,
    matchingConsent: false,
    dateOfBirth: '',
  });
  
  useEffect(() => {

    const savedLanguage = Cookies.get('selectedLanguage');
    if (savedLanguage) {
      changeLanguage(savedLanguage); // 언어 변경
    } else {
      changeLanguage('Korea'); // 기본 언어 설정
    }
    
    
    try {
      if (loc.state.role == "GUEST") {
        setEmail(loc.state.email);
        setUserInfo({ ...userInfo, provider: loc.state.provider, email: loc.state.email });
      }
    } catch (error) {
      nav("/login");
    }
  }, []);

  // useEffect(()=>{
  //   setUserInfo({ ...userInfo, registrationNumber:null, registrationNumber6:null, registrationNumber7:null });
  // }, [gotForeignReg]);
  
  // 각 약관을 본 상태를 추적
  const [viewedTerms, setViewedTerms] = useState({
    information: false,
  });
  
  
  useEffect(()=>{
    setUserInfo({...userInfo, registrationNumber:userInfo.registrationNumber6!==null && userInfo.registrationNumber7!==null ? `${userInfo.registrationNumber6}-${userInfo.registrationNumber7}` : null});
  }, [userInfo.registrationNumber6, userInfo.registrationNumber7]);

  useEffect(()=>{
    if(gotForeignReg || userInfo.nationality === "KR") {
      setUserInfo({ ...userInfo, dateOfBirth:userInfo.registrationNumber6});
    }
  }, [userInfo.registrationNumber]);

  const handleInfoChange = (e) => {
    if (e.target.name.includes("Consent")) {
      const { name, checked } = e.target;
      setUserInfo({ ...userInfo, [e.target.name]: checked });
      return;
    } else if (e.target.name === "nationality") {
      setGotForeignReg(false);
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value, registrationNumber:null, registrationNumber6:null, registrationNumber7:null });
      return;
    } else if (e.target.name === "dateOfBirth") {
      setUserInfo({...userInfo, [e.target.name]: e.target.value, registrationNumber: null});
      return;
    } else if (e.target.name === "registrationNumber6" || e.target.name === "registrationNumber7" || e.target.name === "phoneNumber") {
      setUserInfo({...userInfo, [e.target.name]: e.target.value.replace(/[^0-9]/g, "")});
      return;
    }

    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = [
      'gender', 'nationality', 'phoneNumber', userInfo.nationality === "KR" || gotForeignReg ? "registrationNumber" : "dateOfBirth"
    ];
    
    const isEmptyField = requiredFields.some(field => !userInfo[field]);

    if (isEmptyField) {
      alert(t('AllInfo'));
      return;
    }

    if (!userInfo.informationConsent) {
      setErrorMessage(t('ConsentCollection'));
      return;
    }
    if (
      !viewedTerms.information
    ) {
      setErrorMessage(t('MustComplete'));
      return;
    }

    oauthNew({...userInfo, provider: loc.state.provider, email: loc.state.email, dateOfBirth: userInfo.dateOfBirth.length === 10 ? userInfo.dateOfBirth.replaceAll("-", "").substring(2) : userInfo.dateOfBirth });

  };

  const handleShowModal = (modalType) => setShowModal(modalType);
  const handleCloseModal = () => setShowModal(null);

  const handleModalClose = (modalType) => {
    setViewedTerms({ ...viewedTerms, [modalType]: true });
    setUserInfo({ ...userInfo, [modalType + "Consent"]: true });
    handleCloseModal();
  };

  const handleForeignReg = (e) => {
    if (e.target.value === "yes") {
      setGotForeignReg(true);
    } else {
      setGotForeignReg(false);
    }
  }

  return (
    <div className="contents">
      <div className="d-flex align-items-stretch">
        <div className="container">
          <div className="align-items-center row">
            <div className="px-lg-4 col-lg-6">
              <div className="card">
                <div className="p-lg-5 card-body">
                  <h3 className="mb-4">
                    {t('MustComplete')}
                  </h3>
                  <hr></hr>
                  <form noValidate onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input id="email" name="email" className="form-control" value={email} disabled />
                      <label className="form-label" for="email">{t('Email')}</label>
                    </div>

                    <div className="col-md-12 mb-3">
                      <select
                        name="nationality"
                        className="form-select form-control"
                        value={userInfo.nationality}
                        onChange={handleInfoChange}
                      >
                        <option value="">{t('SelectNation')}</option>
                        <option value="KR">{t('한국')}</option>
                        <option value="US">{t('미국')}</option>
                        <option value="EU">{t('유럽연합')}</option>
                        <option value="JP">{t('일본')}</option>
                        <option value="CN">{t('중국')}</option>
                        <option value="HK">{t('홍콩')}</option>
                        <option value="TW">{t('대만')}</option>
                        <option value="GB">{t('영국')}</option>
                        <option value="OM">{t('오만')}</option>
                        <option value="CA">{t('캐나다')}</option>
                        <option value="CH">{t('스위스')}</option>
                        <option value="SE">{t('스웨덴')}</option>
                        <option value="AU">{t('호주')}</option>
                        <option value="NZ">{t('뉴질랜드')}</option>
                        <option value="CZ">{t('체코')}</option>
                        <option value="CL">{t('칠레')}</option>
                        <option value="TR">{t('튀르키예')}</option>
                        <option value="MN">{t('몽골')}</option>
                        <option value="IL">{t('이스라엘')}</option>
                        <option value="DK">{t('덴마크')}</option>
                        <option value="NO">{t('노르웨이')}</option>
                        <option value="SA">{t('사우디아라비아')}</option>
                        <option value="KW">{t('쿠웨이트')}</option>
                        <option value="BH">{t('바레인')}</option>
                        <option value="AE">{t('아랍에미리트')}</option>
                        <option value="JO">{t('요르단')}</option>
                        <option value="EG">{t('이집트')}</option>
                        <option value="TH">{t('태국')}</option>
                        <option value="SG">{t('싱가포르')}</option>
                        <option value="MY">{t('말레이시아')}</option>
                        <option value="ID">{t('인도네시아')}</option>
                        <option value="QA">{t('카타르')}</option>
                        <option value="KZ">{t('카자흐스탄')}</option>
                        <option value="BN">{t('브루나이')}</option>
                        <option value="IN">{t('인도')}</option>
                        <option value="PK">{t('파키스탄')}</option>
                        <option value="BD">{t('방글라데시')}</option>
                        <option value="PH">{t('필리핀')}</option>
                        <option value="MX">{t('멕시코')}</option>
                        <option value="BR">{t('브라질')}</option>
                        <option value="VN">{t('베트남')}</option>
                        <option value="ZA">{t('남아프리카 공화국')}</option>
                        <option value="RU">{t('러시아')}</option>
                        <option value="HU">{t('헝가리')}</option>
                        <option value="PL">{t('폴란드')}</option>
                        <option value="LK">{t('스리랑카')}</option>
                        <option value="DZ">{t('알제리')}</option>
                        <option value="KE">{t('케냐')}</option>
                        <option value="CO">{t('콜롬비아')}</option>
                        <option value="TZ">{t('탄자니아')}</option>
                        <option value="NP">{t('네팔')}</option>
                        <option value="RO">{t('루마니아')}</option>
                        <option value="LY">{t('리비아')}</option>
                        <option value="MO">{t('마카오')}</option>
                        <option value="MM">{t('미얀마')}</option>
                        <option value="ET">{t('에티오피아')}</option>
                        <option value="UZ">{t('우즈베키스탄')}</option>
                        <option value="KH">{t('캄보디아')}</option>
                        <option value="FJ">{t('피지')}</option>
                      </select>
                    </div>

                    {userInfo.nationality === 'KR' || gotForeignReg ? (
                      <div className='my-flex'>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            name="registrationNumber6"
                            className="form-control"
                            value={userInfo.registrationNumber6}
                            onChange={handleInfoChange}
                            maxLength="6" // '-' 포함하여 최대 길이 설정
                          />
                          <label className="form-label" htmlFor="memberId">
                            {t("First_Registration_Number")}
                          </label>
                        </div>
                        <div className="-center">
                          <p>-</p>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            name="registrationNumber7"
                            className="form-control"
                            value={userInfo.registrationNumber7}
                            onChange={handleInfoChange}
                            maxLength="7"
                          />
                          <label className="form-label" htmlFor="memberId">
                            {/* {t('SocialNumber')} */}
                            {t("Second_Registration_Number")}
                          </label>
                        </div>
                      </div>
                    ) : userInfo.nationality === '' ? (<></>) : (
                      <>
                        <div className="col-md-12 mb-3 gender">
                          <div>
                            <p>{t("have_registration_number?")}</p>
                            <input
                              type="radio"
                              name="got"
                              className="form-check-input"
                              value="yes"
                              checked={gotForeignReg}
                              onChange={handleForeignReg}
                            />
                            <label>{t("yes")}</label>
                            <input
                              type="radio"
                              name="got"
                              className="form-check-input"
                              value="no"
                              checked={!gotForeignReg}
                              onChange={handleForeignReg}
                            />
                            <label>{t("no")}</label>
                          </div>

                        </div>
                        <div className="form-floating mb-3">
                          <input type="date" placeholder={t("Date_of_Birth")} id="dateOfBirth" name="dateOfBirth" className="form-control" onChange={handleInfoChange} value={userInfo.dateOfBirth} />
                          <label className="form-label" for="dateOfBirth">{t("Date_of_Birth")}</label>
                        </div>
                      </>
                    )}

                    <div className="form-floating mb-3">
                      <input placeholder={t('PhoneNumber')} id="phoneNumber" name="phoneNumber" className="form-control" onChange={handleInfoChange} value={userInfo.phoneNumber} />
                      <label className="form-label" for="phoneNumber">{t('PhoneNumber')}</label>
                    </div>

                    <div className="col-md-12 mb-3 gender">
                      <div>
                        <input
                          type="radio"
                          name="gender"
                          className="form-check-input"
                          value="male"
                          checked={userInfo.gender === 'male'}
                          onChange={handleInfoChange}
                        />
                        <label>{t('Male')}</label>
                        <input
                          type="radio"
                          name="gender"
                          className="form-check-input"
                          value="female"
                          checked={userInfo.gender === 'female'}
                          onChange={handleInfoChange}
                        />
                        <label>{t('Female')}</label>
                      </div>
                    </div>

                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        name="informationConsent"
                        className="form-check-input"
                        checked={userInfo.informationConsent}
                        onChange={handleInfoChange}
                      />

                      <label htmlFor="agree" className="form-check-label">
                        {t('Collection')}
                      </label>

                      <Button
                        variant="link"
                        onClick={() => handleShowModal("information")}
                        className='agree-btn'
                      >
                        {t('Look')}
                      </Button>
                    </div>

                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        name="locationConsent"
                        className="form-check-input"
                        checked={userInfo.locationConsent}
                        onChange={handleInfoChange}
                      />

                      <label htmlFor="agree" className="form-check-label">
                        {t('ConsentLocation')}
                      </label>

                      <Button
                        variant="link"
                        onClick={() => handleShowModal("location")}
                        className='agree-btn'
                      >
                        {t('Look')}
                      </Button>
                    </div>

                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        name="matchingConsent"
                        className="form-check-input"
                        checked={userInfo.matchingConsent}
                        onChange={handleInfoChange}
                      />

                      <label htmlFor="agree" className="form-check-label">
                        {t('ConsentMatching')}
                      </label>

                      <Button
                        variant="link"
                        onClick={() => handleShowModal("matching")}
                        className='agree-btn'
                      >
                        {t('Look')}
                      </Button>
                    </div>

                    <Button className="my-btn" type='submit'>
                      {t('Complete')}
                    </Button>
                  </form>

                  {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <ul style={{ margin: '0 0 10px', padding: '0' }}>
            <li> &nbsp; &nbsp; ⦁ {t('collected_info_item_1')}</li>
            <li>&nbsp; &nbsp; ⦁ {t('collected_info_item_2')}</li>
          </ul>
          <br></br>
          <h4>{t('usage_purpose_title')}</h4>
          <p>{t('usage_purpose_description')}</p>
          <ul style={{ margin: '0 0 10px', padding: '0' }}>
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
          <ul style={{ margin: '0 0 10px', padding: '0' }}>
            <li> ⦁ {t('location_info_item_1')}</li>
          </ul>

          <h4> {t('location_usage_purpose_title')}</h4>
          <p> {t('location_usage_purpose_description')}</p>
          <ul style={{ margin: '0 0 10px', padding: '0' }}>
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
          <ul style={{ margin: '0 0 10px', padding: '0' }}>
            <li>&nbsp; &nbsp; ⦁ {t('matching_info_item_1')}</li>
            <li>&nbsp; &nbsp; ⦁ {t('matching_info_item_2')}</li>
          </ul>

          <h4>{t('matching_usage_purpose_title')}</h4>
          <p>{t('matching_usage_purpose_description')}</p>
          <ul style={{ margin: '0 0 10px', padding: '0' }}>
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
  );
}

export default OAuthNew;