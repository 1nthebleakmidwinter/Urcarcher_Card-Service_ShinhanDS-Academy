import React, { useEffect, useState } from "react";
import { signin } from "../../services/AuthService";
import "pages/auth/Login.css";
import googleLogo from "assets/googleLogo.png";
import appleLogo from "assets/appleLogo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import cookie from 'react-cookies';
import axios from 'axios';
import { options_GET } from "services/CommonService";
import LoadingSpinner from "components/LoadingSpinner";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';

function Login() {

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

  const nav = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(cookie.load("URCARCHER_ACCESS_TOKEN") != null) {
      axios(options_GET("/api/auth/authorizing", null))
      .then((resp)=>{
          if(resp.data.isAuthorized == true) {
              nav('/');
          }
          setLoading(false)
        })
      .catch((err)=>{
        console.log(err);
      }).finally(()=>{
        setLoading(false); 
      });
    } else {
      setLoading(false);
    }

    const savedLanguage = Cookies.get('selectedLanguage');
    if (savedLanguage) {
      changeLanguage(savedLanguage); // 언어 변경
    } else {
      changeLanguage('Korea'); // 기본 언어 설정
    }

  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const googleOauth2Handler = () => {
    window.location.href = process.env.REACT_APP_GOOGLE_OAUTH2_HANDLING;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get("username");
    const password = data.get("password");
    const on = data.get("agree");

    const success = await signin({ memberId: username, password: password, agree: on });

    if (success) {
      const redirectPath = location.state?.from?.pathname || "/";
      nav(redirectPath);
      window.location.reload();
    } else {
      alert("로그인 실패");
    }
  };

  const goSignupPage = () => {
    nav("/signup");
  };

  return (
    <div className="align-items-center row contents">
      <div className="px-lg-4 col-lg-6">
        <div className="card">
          <div className="p-lg-5 card-body">
            <form noValidate onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input placeholder={t('Id')} id="username" name="username" className="form-control" />
                <label className="form-label" htmlFor="email">{t('Id')}</label>
              </div>

              <div className="form-floating mb-3">
                <input placeholder={t('Pw')} type="password" id="password" name="password" className="form-control" />
                <label className="form-label" htmlFor="password">{t('Pw')}</label>
              </div>

              <button type="submit" className="btn btn-primary btn-lg">{t('Login2')}</button>

              <div className="mb-3 form-check">
                <div className="fc-1">
                  <input type="checkbox" id="agree" name="agree" className="form-check-input" />
                  <label title="" htmlFor="agree" className="form-check-label">{t('AutoLogIn')}</label>
                </div>

                <div className="fc-2">
                  <Link to="/find/id" className="findid">{t('FindId')}</Link>
                  <label>|</label>
                  <Link to="/find/pw">{t('FindPw')}</Link>
                </div>
              </div>
            </form>
            <button className="btn btn-primary btn-lg oauth" onClick={googleOauth2Handler}>
              <img className="logo" src={googleLogo} alt="Google Logo"/>
              Google {t('Login2')}
            </button>

            <button className="btn btn-primary btn-lg oauth">
              <img className="logo" src={appleLogo} alt="Apple Logo"/>
              Apple {t('Login2')}
            </button>

            <div className="wantsign">
              <span>{t('YetMember')}</span>
              <button onClick={goSignupPage}>{t('SignUp')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
