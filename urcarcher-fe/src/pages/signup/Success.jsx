import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./signup.css"
import welcome from 'assets/welcome.gif'
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';


function Success() {

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


    const navigate = useNavigate();

    useEffect(() => {

        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }


        const timer = setTimeout(() => {
            navigate('/login');
        }, 3000); // 3초 후에 자동으로 로그인 페이지로 이동

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, [navigate]);


    return (
        <div className="contents">
            <div className="mb-4 card">
                <img className="card-img-top" src={welcome} alt="welcome image" />
            <div className="card-body">
            <h1 className="card-text">{t('welcome')}</h1>
            <h3 className="card-text">{t('membership_confirmed')}</h3>
            {/* Illustration by <a href="https://icons8.com/illustrations/author/WsYoyZ6jp8sg">Victoria Chepkasova</a> from <a href="https://icons8.com/illustrations">Ouch!</a> */}
            </div>
            </div>
        </div>
    );
}

export default Success;