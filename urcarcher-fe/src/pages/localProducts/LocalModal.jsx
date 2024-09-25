import React, { useEffect } from 'react';
import 'pages/localProducts/LocalModal.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
function LocalModal({ show, onClose, region, description, link, modalImgSrc }) {

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

    if (!show) {
        return null;
    }

    return (
        <div className="local-modal-overlay" onClick={onClose}>
        <div className="local-modal-content" onClick={(e) => e.stopPropagation()}>
            <p>
              <img src={modalImgSrc} alt={region} style={{ width: '120px', borderRadius: '10px', marginBottom: '15px' }} />
            </p>
            <h3>{region}</h3>
            <p>{description}</p>
            <Link to={link}>
                <button>{t('BuyNow')}</button>
            </Link>
            <button onClick={onClose} style={{backgroundColor:'#F77777', marginLeft:'10px'}}>{t('Close')}</button>
        </div>
    </div>
    );
}

export default LocalModal;