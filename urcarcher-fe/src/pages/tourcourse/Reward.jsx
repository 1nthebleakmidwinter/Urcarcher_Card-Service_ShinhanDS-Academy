import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RewardKo from 'assets/Reward_ko.png';
import RewardEn from 'assets/Reward_en.png';
import RewardJp from 'assets/Reward_ko.png';
import RewardCn from 'assets/Reward_ko.png';
const Reward = () => {
  
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

    const getImageForLanguage = () => {
        switch (i18n.language) {
          case 'ko':
            return RewardKo;
          case 'en':
            return RewardEn;
          case 'jp':
            return RewardJp;
          case 'cn':
            return RewardCn;
          default:
            return RewardKo;
        }
    };


    return (
        <div style={{ height: '100vh', overflow: 'auto' }}> 
          <img 
            src={getImageForLanguage()} 
            alt="Reward Image" 
            style={{ maxWidth: '100%', height: 'auto' }}  
          />
        </div>
      );
    };

export default Reward;
