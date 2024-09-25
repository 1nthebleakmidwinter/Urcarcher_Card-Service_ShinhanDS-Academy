import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';
import { useCallback, useEffect, useRef, useState } from 'react';
function ServiceList () {

  
  

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

    const services = [
        {
          name: t('Rates'),
          imgSrc: "/img/home/service1.png",
          link: "/exchange/realtime/rate",
        },
        {
          name: t('Exchange'),
          imgSrc: "/img/home/service2.png",
          link: "/exchange",
        },
        {
          name: t('Place'),
          imgSrc: "/img/home/service3.png",
          link: "/searchtour",
        },
        {
          name: t('TourCourse'),
          imgSrc: "/img/home/service4.png",
          link: "/courseList",
        },
    ];

    useEffect(()=>{
     
  
      const savedLanguage = Cookies.get('selectedLanguage');
      if (savedLanguage) {
          changeLanguage(savedLanguage); // 언어 변경
      } else {
          changeLanguage('Korea'); // 기본 언어 설정
      }
  },[]);


    return (
        <ul className='service-list'>
        {services.map((service, index) => (
          <li key={index}>
            <Link to={service.link}>
              <img src={service.imgSrc} alt={service.name} />
              <p>{service.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    );
}

export default ServiceList ;