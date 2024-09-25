import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'assets/Map.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { options_GET } from 'services/CommonService';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';


function MyMapHome(props) { //시작 페이지

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
    


    const navigator = new useNavigate();

    //로그인한 회원 이름 저장
    const [memberId, setMemberId] = useState(''); 
    const [name, setName] = useState('');

    const isAuthorized = () => {

        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }


        if(cookie.load("URCARCHER_ACCESS_TOKEN") != null) {
          axios(options_GET("/api/auth/authorizing", null))
            .then((resp)=>{
              if(resp.data.isAuthorized == true) {
                setMemberId(resp.data.memberId);
                setName(resp.data.name);
                //console.log(name);
              }
            })
            .catch((err)=>{
              console.log(err);
            });
        }
    };
    
    useEffect(() => {
        isAuthorized();
      }, []);
      
    // name이 업데이트된 후에만 실행
    useEffect(() => {
        if (name) {
            //console.log(name)
        }
    }, [name]); // name이 업데이트될 때마다 실행
    

    //버튼 클릭이벤트 - 페이지 이동
    const goRankPage = () => {
        navigator("/maphome/categoryRank",{ state: { memberId } } );
    }
    return (
        <div>
            <div className='mymaphome-wrap contents'>
                <div className='maphome-content inner'>
                    <div className='maphome_textwrap'>
                        <p>{t('DrawnWithPaymentHistory')}</p>
                        <p>{t('MyOwnMap')}</p>
                    </div>
                    <div className='map-img-wrap'>
                        <img src='/icon/map-main-img.png' alt="지도이미지" />
                    </div>
                    <div className='maphome-btn inner'>
                        <span>{name === ''? '회원' : name}{t('RecommendPlacesBasedOnPaymentHistory')}</span>
                        <button onClick={goRankPage}>{t('GetStarted')}</button>
                    </div> 
                </div>
        {/*     <div className='maphome-btn inner'>
                    <span>{name === ''? '회원' : name}{t('RecommendPlacesBasedOnPaymentHistory')}</span>
                    <button onClick={goRankPage}>{t('GetStarted')}</button>
                </div> 
            */}
            </div>
        </div>
    );
}

export default MyMapHome;