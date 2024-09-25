import 'assets/Home.css';
import axios from 'axios';
import CurrencyRateList from 'components/home/CurrencyRateList';
import ServiceList from 'components/home/ServiceList ';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { options_GET } from 'services/CommonService';
import cookie from 'react-cookies';
import Footer from 'components/Footer';
import LoadingSpinner from 'components/LoadingSpinner';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';

function Home(props) {

    const navigator = new useNavigate();
    //bleakwinter (신용카드) happy(선불카트) - 테스트ID
    const [memberId, setMemberId] = useState(''); 
    const [name, setName] = useState('');
    const [mainCardInfo, setMainCardInfo] = useState([]);
    const [loading, setLoading] = useState(true);
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
    
     //1. 로그인 회원 정보   
    const isAuthorized = () => {
        if(cookie.load("URCARCHER_ACCESS_TOKEN") != null) {
          axios(options_GET("/api/auth/authorizing", null))
            .then((resp)=>{
              if(resp.data.isAuthorized == true) {
                setMemberId(resp.data.memberId);
                setName(resp.data.name);

            }else{
                  setLoading(false);
              }
            })
            .catch((err)=>{
              console.log(err);
              setLoading(false);
            });
        } else {
            setLoading(false); // 토큰이 없으면 로딩 종료
        }
    };
    // isAuthorized();

    useEffect(()=>{
        isAuthorized();

        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }
    },[]);
    
    //2. 회원이 소지하고 있는 첫 번째 카드 종류와 이번 달 카드 사용 금액 정보 
    useEffect(() => {
        // memberId가 없으면 에러 처리
        // if (!memberId) {
        //     console.log('Member ID is missing!');
        //     setLoading(false); // memberId가 없을 경우에도 로딩 상태를 false로 설정
        //     return;
        // }
        if (memberId) {
                axios.get(`/api/home/my-main-card/${memberId}`)
                .then(response => {
                    console.log(response);
                    setMainCardInfo(response.data);
                    setLoading(false); // 데이터 로드 후 로딩 종료
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    setLoading(false); // 에러 발생 시 로딩 종료
                });
        }

    }, [memberId]);

    //로딩 시 로딩 컴포넌트를 표시
    if (loading) {
        return <LoadingSpinner />;
    }

    //3.실시간 환율 정보 : CurrencyRateList 컴포넌트에서 처리
    
    //현재 날짜
    const getCurrentDate = () => {
        const date = new Date();
        const month = date.getMonth() + 1; // 월은 0부터 시작
        const day = date.getDate();
      
        // 월과 일이 한 자릿수일 경우 앞에 0을 붙여주는 형식
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;
      
        return `${formattedMonth}.${formattedDay}`;
    };

    const goChargePage = () => {
        navigator("/cardmanagement");
    }
    console.log(mainCardInfo);
    // console.log(mainCardInfo.point);
    return (
        <div className="contents">
            <div className='home-container'>
                <SelectLanguage changeLanguage={changeLanguage} />
                {memberId ? (
                    <h5>
                        <span style={{color:'#476EFF'}}>{name}</span>
                        <span className='greeting-text'>{t('Greeting')}🙌</span>
                    </h5>
                ) : (
                    <h5>
                        <Link to='/login'>🙌{t('Login')}</Link>
                    </h5>
                )}
                <div className='main-content'>
                    <h2 className='hidden'>card section</h2>

                    {/* API 호출 렌더링 오류 수정 */}
                    <div className="card-type-wrap">
                    {loading ? ( // 로딩 중일 때는 로딩 컴포넌트만 표시
                        <LoadingSpinner /> 
                    ) : (
                        memberId ? ( // 로그인 한 경우
                            mainCardInfo && mainCardInfo.cardId !== null ? ( // 로그인 후 카드 정보 있고, 카드 ID가 있을 경우 
                                <>
                                    {/* 1. 메인 카드 정보 */}
                                    <p className='card-type-text'>
                                        <span>{mainCardInfo.cardUsage === "신용카드" ? mainCardInfo.card_number : mainCardInfo.cardName}</span>
                                        <span className={ !mainCardInfo.cardUsage  ? 'hidden'  : 'type' }>
                                            {
                                                mainCardInfo.cardUsage === '신용카드'  ? t('CreditCard')  
                                                : mainCardInfo.cardUsage === '선불카드' ? t('PrepaidCard') : ''
                                            }
                                        </span>
                                    </p>
                                    <p className='card_balance'>
                                        { mainCardInfo.cardUsage === "신용카드" ? '' : (  //신용카드이면 잔액 출력, 선불카드일 때 카드 충전 
                                            mainCardInfo.cardBalance ? mainCardInfo.cardBalance.toLocaleString() + " " + t('Won') :  <Link to='/cardmanagement'>{t('CardRecharge')}</Link>
                                        )}
                                    </p>
                                    <p 
                                        className={mainCardInfo.cardUsage === "신용카드" ||  !mainCardInfo.cardUsage ? 'hidden' : 'card-charge'}
                                        onClick={goChargePage}
                                    >
                                        {t('Charge')}
                                    </p>
                                    <p className={mainCardInfo.cardUsage === "신용카드" ? 'mycard-expiration-date' : 'hidden'}>{t('ExpirationDate')}:  {mainCardInfo.expiration_date || ''}</p>
                                    <p className={mainCardInfo.cardUsage === "신용카드" ? 'mycard-name' : 'hidden'}> {mainCardInfo.name || ''} </p>
                                </>
                            ) : (// 로그인 후 카드 정보 없는 경우
                                //<p className='card_balance'>카드 발급 후 사용해주세요!</p>
                                <>
                                    <p className='card_balance-no'>{t('VariousService')}</p>
                                    <p className='member-sigup'>
                                        <Link to='/card1'>{t('ApplyCard')}</Link>
                                    </p>
                                </>  
                            )
                        ) : ( // 로그인하지 않은 경우
                            <>
                                <p className='card_balance-no'>{t('VariousService')}</p>
                                <p className='member-sigup'>
                                    <Link to='/signup'>{t('SignUp')} </Link>
                                </p>
                            </>   
                        )
                    )}
                    </div>

                    {memberId ? ( //로그인 한 경우
                        mainCardInfo ? ( //카드 정보 있는 경우
                            <div className='amount-used'>
                                <p>{t('SpendAmount')}</p> 
                                {/* null 값 처리 */}
                                <p>{mainCardInfo.totalPayment ? mainCardInfo.totalPayment.toLocaleString() + " " + t('Won') : 0 + " " + t('Won')}</p>
                            </div>
                        ) : (
                            <div className='amount-used'>
                                <p className='noCardInfo-text'>{t('NoHistory')}</p>
                            </div>
                        )
                    ) : ( //로그인하지 않은 경우
                        <div className='amount-used-no'>
                            <p><Link to="/login">{t('AfterLogin')}</Link></p>
                        </div>
                    )}
                    
                    <div className='card-signup'>
                        <p><Link to="/card1">{t('ApplyCard2')}</Link></p>
                        <p>
                            <Link to="/card1"><img src="icon/icon-credit-card.png" alt="카드신청" style={{width:"40px"}}/></Link>
                        </p>
                    </div>
                 
                    <div className='my-point'>
                        <p><Link to="/card1">{t('myPoints')}</Link></p>
                        <p> {mainCardInfo.point === undefined ? '-' :  mainCardInfo.point + ' P'}</p>
                        
                    </div>
                </div>
                <div className='home-content-box'> 
                    <h4 className='home-title'>{t('Service')}</h4>
                    <ServiceList />
                </div>
                <div className='home-title-wrap'> 
                    <div className ="currentExchange">
                    <h4 className='home-title'>{t('CurrentExchange')}</h4> 
                    <p className='rate-date'>({getCurrentDate()})</p>
                    </div>
                    <CurrencyRateList />
                </div>
            </div>
        </div>
    );
}

export default Home;