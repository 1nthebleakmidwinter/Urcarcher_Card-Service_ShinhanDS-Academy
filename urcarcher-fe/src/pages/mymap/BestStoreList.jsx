import 'assets/Map.css';
import axios from 'axios';
import LoadingSpinner from 'components/LoadingSpinner';
import StoreInfoList from 'components/mymap/StoreInfoList';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';


function BestStoreList(props) {

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


    const location = useLocation();
    const [storeList, setStoreList] = useState([]);
    const [loading, setLoading] = useState(true);

   

    useEffect(() => {

        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }


        axios.get(`/api/paymentPlace/best-store`, {
            // params: {
            //     memberId: memberId
            // }
        })
        .then(response => {
            setStoreList(response.data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            console.error('There was an error!', error);
        });
    }, []);
    
    const navigator = new useNavigate();
    
    const goHome = () => {
        navigator('/');
    }

    //로딩 시 로딩 컴포넌트
    if (loading) {
        return <LoadingSpinner />;
    }

     // 로딩이 끝났지만 storeList가 빈 배열인 경우
     if (!loading && storeList.length === 0) {
        return (
            <div className='noReslut-wrap-bs inner'>
                <img src="/icon/white-exclamation-mark.png" alt="느낌표" 
                    style={{width:'30px', height:'150px'}}
                />
                <h2 style={{margin:'20px 0'}}>{t('NoVisitHistory')}</h2> 
                <button 
                    className='mymap-btn'
                    onClick={goHome}>
                   {t('GoBackHome')}
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className='contents'>
                <div className='categoryRank-title inner'>
                    <h3> {t('PopularPlaces')}</h3>
                </div>
                <StoreInfoList storeList={storeList} />
            </div>
        </div>
    );
}

export default BestStoreList;