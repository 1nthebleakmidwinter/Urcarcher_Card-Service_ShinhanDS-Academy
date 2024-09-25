import React, { useEffect, useState, useCallback } from 'react';
import CardOverlay from '../../bootstrap-template/components/cards/CardOverlay';
import { Link } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';



function SearchTour(props) {

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


    let [contentTypeId, setContentTypeId] = useState('12');

    const radios = [
        { name: t('TouristAttractions'), value: '12' },
        { name: t('Restaurants'), value: '39' }
    ];
    // 버튼 클릭 헨들러 함수가 리렌더링될때마다 새로생성되지 않게 useCallback함수 사용
    const handleRadioChange = useCallback((value) => {
        setContentTypeId(value);
    },[]);


    const cardsData = [
        { title: 'SEOUL', img: '/img/seoul.jpg', areaCode:'1' },
        { title: 'BUSAN', img: '/img/busan.jpg', areaCode:'6' },
        { title: 'JEJU', img: '/img/jeju.jpg', areaCode:'39' },
        { title: 'INCHEON', img: '/img/incheon.jpg', areaCode:'2' },
        { title: 'GYEONGGI', img:'/img/gyeonggi-do.jpg', areaCode:'31' },
        { title: 'GANGWON', img:'/img/gangwon-do.jpg', areaCode:'32' },
        { title: 'JEON\nNAM', img:'/img/jeonnam.jpg', areaCode:'38' },
        { title: 'JEON\nBUK', img:'/img/jeonbuk.jpg', areaCode:'37' },
        { title: 'GYEONG\nNAM', img:'/img/gyeongnam.jpg', areaCode:'36' },
        { title: 'GYEONG\nBUK', img:'/img/gyeongbuk.jpg', areaCode:'35' },
    ];


    const buttonStyle = (isActive) => ({
        width: '100px',
        textAlign: 'center',
        padding: '8px 10px',
        fontSize: '14px',
        cursor: 'pointer',
        borderRadius: '20px',
        margin: '0 5px',
        backgroundColor: isActive ? '#476EFF' : '#f8f9fa',
        color: isActive ? 'white' : '#007bff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s, color 0.3s',
        border: 'none',  // 테두리 제거
    });

        
    useEffect(()=>{
    
        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }
    },[]);


    return (
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        {/* p태그 center로 수정(08.29) */}
        <p style={{textAlign:'center', padding:'10px'}}>{t('SelectCategoryAndRegion')}</p>
        <ButtonGroup className="mb-3 d-flex justify-content-center">
            {radios.map((radio, idx) => (
                <button
                    key={idx}
                    style={buttonStyle(contentTypeId === radio.value)}
                    onClick={() => handleRadioChange(radio.value)}
                >
                    {radio.name}
                </button>
            ))}
        </ButtonGroup>
        <div  className="scrollable-content" style={{ maxHeight: '600px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
            
            {cardsData.map((card, index) => (
                
                <div key={index} style={{ flex: '1 1 calc(50% - 20px)', maxWidth: 'calc(50% - 20px)' }}>
                    <Link to={`/tourguide/${card.areaCode}/${contentTypeId}`}>
                        <CardOverlay
                                className="my-custom-class" 
                                title={card.title}
                                img={card.img}
                                style={{
                                    color: '#ffffff',  // 흰색 글자
                                    textAlign: 'center',
                                    fontSize: '2rem',  // 글자 크기
                                    fontWeight: '700',  // 굵은 글자
                                    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.7)',  // 텍스트 그림자
                                    fontFamily: 'Poppins, sans-serif',  // 세련된 폰트
                                    letterSpacing: '2px',  // 글자 간격 조정
                                    position: 'absolute',
                                    top: '40px',  // 타이틀이 상단에 위치하도록 설정
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    zIndex: 1
                                }}
                                titleSize={'2rem'}  // titleSize 속성 전달
                                imgStyle={{ height: '200px', width: '100%', objectFit: 'cover' }}  // 이미지 스타일 전달
                            />
                    </Link>
                </div>
            ))}
        </div>
        </div>
        </>
    );
}

export default SearchTour;
