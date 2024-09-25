import 'assets/Menu.css';
import MenuCategory from 'components/menu/MenuCategory';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from 'services/AuthService';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';



function Menu({onClose, isLoggedIn, userName}) {

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

    const [isActive, setIsActive] = useState(false);
    
   // 로그인 (로그인 정보 API 로직 추가하기 ) 
    const handleLogin = () => {
      onClose(); //메뉴 닫기
    };

  // 로그아웃
  const handleLogout = () => {
    logout();
  };

    //Esc키로 메뉴 닫기
    useEffect(() => {

      const savedLanguage = Cookies.get('selectedLanguage');
      if (savedLanguage) {
          changeLanguage(savedLanguage); // 언어 변경
      } else {
          changeLanguage('Korea'); // 기본 언어 설정
      }
      
      const handleEscape = (event) => {
          if (event.key === 'Escape') {
              onClose();
          }
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
          document.removeEventListener('keydown', handleEscape);
      };
  }, [onClose]);

  useEffect(() => {
      // 컴포넌트가 마운트된 후에 `active` 클래스를 추가하기 위한 Timeout
      const timer = setTimeout(() => {
          setIsActive(true);
      }, 10); 
      // 컴포넌트 언마운트 시 타이머 정리
      return () => clearTimeout(timer);
  }, []);

    return (
        <div className={`menu-wrap ${isActive ? 'active' : ''}`}>
          <div className='menu inner'>
            <button className='close-button' onClick={onClose}>X</button>
              <div className="login-section">
                <div className="login-prompt">
                  <h3>
                  {isLoggedIn ? (
                      <>
                        <span>{userName}</span>
                        <Link to="/" onClick={handleLogout} className='logout-txt'>{t('LogOut')}</Link>
                      </>
                    ) : (
                      <Link to="/login" onClick={handleLogin}>{t('Login2')}</Link>
                  )}
                  </h3>
                  <div className="menu-banner">
                    {/* 언어가 영어, 일본어 일 때 크기 조절 */}
                    <p className='menu-banner-text' 
                      style={i18n.language === 'en' || i18n.language === 'jp'?  {fontSize:'13px'} : {fontSize:'16px'} }
                    >
                      {t('ReceiveReward')}
                    </p>
                    <p>
                      <img src="/icon/gift.png" alt="부채" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="menu-section">
              <MenuCategory 
                onClose={onClose}
                title={
                  {id:111, tit:t('Recommend')}
                } 
                items={[
                  { id: 1, text: t('ApplyCard2'), link: "/card1" },
                  { id: 2, text: t('Exchange'), link: "/exchange" },
                  { id: 3, text: t('RecommendCourse'), link: "/courseList" },
                  { id: 4, text: t('ReportMenu'), link: "/chart2" },
                ]}
              />
              <MenuCategory 
                onClose={onClose}
                title={
                  {id:121, tit:t('Finance')}
                } 
                items={[
                  { id: 5, text: t('ApplyCard2'), link: "/card1" },
                  { id: 6, text: t('MyCard'), link: "/cardmanagement" },
                  { id: 10, text: t('SpendingMenu'), link: "/usage" },
                  { id: 11, text: t('PatternMenu'), link: "/chart1" },
                  { id: 12, text: t('ExchangeMenu'), link: "/exchange/realtime/rate" },
                  { id: 13, text: t('Exchange'), link: "/exchange" },
                ]}
              />
              <MenuCategory 
                onClose={onClose}
                title={
                  {id:131, tit:t('Tourism')}
                } 
                items={[
                  { id:14, text: t('RecommendSpot'), link: "/searchtour" },
                  { id:15,text: t('PaymentBased'), link: "/maphome" },
                  { id:16,text: t('BookActivities'), link: "/performanceList" },
                  { id:17,text: t('RecommendCourse'), link: "/courseList" },
                  { id:18,text:  t('Reward'), link: "/reward" },
                  { id:19,text: t('FindRoute'), link: "/MapComponent" },
                  { id:20,text: t('Reservation_confirmation'), link: "/myReservationList1" },
                  { id:21,text: t('RecommendedLocal'), link: "/localProducts" }  //지역 특색 식품 추천
                ]}
              />
              <MenuCategory 
                onClose={onClose}
                title={
                  {id:141, tit:t('CustomerCenter')}
                } 
                items={[
                  { id:22, text: t('FAQ'), link: "/faq" },
                ]}
              />
            </div>
          </div>
        </div>
      );
}

export default Menu;