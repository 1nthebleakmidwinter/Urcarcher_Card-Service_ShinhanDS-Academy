import BasicForm from 'bootstrap-template/components/Forms/BasicForm';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';
import { useEffect, useState } from 'react';

function LoseCard(props) {

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


    return (
        <div>
            <BasicForm
                textContent={t('EnterLossReason')}
                passwordContent={t('EnterPIN')}
                buttonContent={t('ReportLoss')}
                setShowModal={props.setShowModal}/>
        </div>
    );
}

export default LoseCard;