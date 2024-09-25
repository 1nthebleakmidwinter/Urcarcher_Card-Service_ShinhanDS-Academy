import 'assets/Map.css';
import axios from 'axios';
import LoadingSpinner from 'components/LoadingSpinner';
import CategoryRankList from 'components/mymap/CategoryRankList';
import RandomImage from 'components/mymap/RandomImage';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';

function MyCategoryRank(props) {

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
    //const { memberId } = location.state || ''; 
    //console.log(memberId)
    const mid = location.state.memberId;
    console.log("state로 받은 아이디1", mid);

    const navigator = new useNavigate();    
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    //결제 내역의 카테고리 데이터 호출
    useEffect(() => {

        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }


        axios.get(`/api/paymentPlace/categories`, {
            params: {
                memberId: mid
            }
        })
        .then(response => {
            setCategoryList(response.data); // 데이터를 상태에 저장
            setLoading(false);
        })
        .catch(error => {
            console.error('There was an error!', error);
            setLoading(false);
        });
    }, [mid]);



    //버튼 클릭이벤트 - 페이지 이동
    const goMapAppPage = () => {
        navigator("/maphome/map" , { state: { categoryList, mid }});
    }

    //나의 결제 내역이 없을 경우
    const goHome = () => {
        navigator('/');
    }
    const goBestStoreList = () => {
        navigator('/maphome/beststorelist');
    }
    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <div className='categoryRank-wrap contents'>
                {categoryList.length > 0 ? (
                    <>
                        <div className='categoryRank-title inner'>
                            <p>{t('DiscoverNewPlaces')}</p>
                            <h3>{t('MostVisitedThisMonth')}</h3>
                        </div>
                        <RandomImage />
                        <CategoryRankList categoryList={categoryList} />
                        <div className='ranklist-btn inner'>
                            <button className='mymap-btn'  onClick={goMapAppPage}>
                            {t('ExploreAroundMe')}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className='noReslut-wrap inner'>
                        <img src="/icon/white-exclamation-mark.png" alt="느낌표" 
                            style={{width:'30px', height:'150px'}}
                        />
                        <h2 style={{margin:'20px 0'}}>{t('NoPaymentHistory')}</h2> 
                        <div>
                            <button className='mymap-btn' onClick={goHome}>
                            {t('GoBackHome')}
                            </button>
                            <button className='mymap-btn' 
                                    onClick={goBestStoreList}
                                    style={{margin:'10px 0 0', backgroundColor:'#F77777'}}
                            >
                                {t('ExplorePopularPlaces')}
                            </button>
                        </div>
                    </div>
                    
                )}
            </div>
            {/* <div className='ranklist-btn inner'>
                <button 
                    className={`mymap-btn ${categoryList.length > 0 ? '' : 'home-btn'}`} 
                    onClick={categoryList.length > 0 ? goMapAppPage : goHome}>
                    {categoryList.length > 0 ? '내 주변 탐색' : '홈으로 돌아가기'}
                </button>
            </div> */}
        </div>
    );
}

export default MyCategoryRank;