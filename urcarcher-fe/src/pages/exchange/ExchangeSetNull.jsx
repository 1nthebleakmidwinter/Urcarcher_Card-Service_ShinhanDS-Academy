import exSetting from 'assets/exchange/exchange-setting.png';
import 'assets/exchangeSetNull.css';
import 'assets/Language.css';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function ExchangeSetNull({ exchangeSetHandle }) {
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
        <div className="ex_set_null_wrapper">
            <div className="ex_set_chart fly_card">
                <img src={exSetting} alt="예약"/>
            </div>
            <div className="ex_set_null">
                <p>{t('NoAutoRechargeSettings')}</p>
            </div>
            <div className="exchange_set_btn_wrapper">
                <button className="exchange_set_btn" onClick={exchangeSetHandle}>{t('SetAutoRecharge')}</button>
            </div>
        </div>
    );
}

export default ExchangeSetNull;