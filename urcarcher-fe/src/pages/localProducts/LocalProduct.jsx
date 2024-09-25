import React, { useEffect, useState } from 'react';
import 'pages/localProducts/LocalProduct.css';
import productMap from 'assets/localProduct/map_img.png';
import { Link } from 'react-router-dom';
import LocalModal from './LocalModal';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import {productLinks} from 'pages/localProducts/ProductImg'; //productLinks 함수 


function LocalProduct(props) { //특산품 추천

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


    const [selectedImg, setSelectedImg] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    //설명,지역 
    const descriptions = {
        1: { region: "경남 의령 - 망개떡", description: t('MunggaeTteok') },
        2: { region: "충남 공주 - 알밤빵", description: t('GongjuFood') },
        3: { region: "경기 가평 - 잣한과", description: t('Hangwa') },
        4: { region: "경북 영주시 - 사과빵", description: t('AppleDesert') },
        5: { region: "전북 전주 - 비빔빵", description: t('JeonjuFood') },
        6: { region: "익산 - 생크림 찹쌀떡", description: t('IksanFood') },
        7: { region: "강원도 양양 - 양양샌드", description: t('YangyangFood') },
        8: { region: "경북 경주 - 황남빵", description: t('GyeongjuFood') },
        9: { region: "대전 - 무화과시루", description: t('DaejeonFood') },
        10: { region: "제주 - 마음샌드", description: t('JejuFood') },
        11: { region: "광주 - 무등산수박커피", description: t('GwangjuFood') }
    };
   
    const handleClick = (imgNumber) => {
        setSelectedImg(imgNumber);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedImg(null);
    };
    return (
        <div className='prod-container'> 
            <h2 style={{marginTop:'40px'}}> 
                {t('We')} 
                <span style={{color:'#476eff'}}> {t('Specialty1')}</span> 
                {t('Desert')} 
                <span style={{color:'#476eff'}}> {t('Specialty2')} </span> 
                {t('Plus')}
            </h2>
            {i18n.language !== 'en' && ( //언어가 영어일 때 텍스트 숨김
                <p className='prod-text'>
                    {t('click')}!
                </p>
            )}
            <div className='prod-map-wrap'>
                <div className='prod-map'>
                    <img src={productMap} alt="특산품 지도" />
                </div>
                {productLinks.map((product, index) => (
                    <div className={`imgbox imgbox${index + 1}`} onClick={() => handleClick(index + 1)} key={index}>
                        <img src={product.imgSrc} alt={product.alt} />
                    </div>
                ))}
            </div>
             <LocalModal
                show={isModalOpen}
                onClose={handleCloseModal}
                region={selectedImg ? descriptions[selectedImg].region : ""}
                description={selectedImg ? descriptions[selectedImg].description : ""}
                link={selectedImg ? productLinks.find(product => product.id === selectedImg).url : ""}
                modalImgSrc={selectedImg ? productLinks.find(product => product.id === selectedImg).modalImgSrc : ""}
            />
        </div>
    );
}

export default LocalProduct;