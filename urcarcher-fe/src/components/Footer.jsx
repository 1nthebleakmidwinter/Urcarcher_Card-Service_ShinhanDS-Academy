import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from './menu/Menu';
import cookie from 'react-cookies';
import axios from 'axios';
import { options_GET } from 'services/CommonService';

function Footer(props) {
   
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMenuVisible, setIsMenuVisible] = useState(false); // 메뉴 상태

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState(''); 

    const isAuthorized = () => {
        if(cookie.load("URCARCHER_ACCESS_TOKEN") != null) {
          axios(options_GET("/api/auth/authorizing", null))
            .then((resp)=>{
              if(resp.data.isAuthorized == true) {
                setUserName(resp.data.name);
                setIsLoggedIn(true);
              } else {
                setIsLoggedIn(false);
              }
            })
            .catch((err)=>{
              console.log(err);
            });
        }
      };
  
      useEffect(()=>{
        isAuthorized();
      }, []);

    //path 경로 추가하기 
    const menuItems = [ 
        { src: "/icon/menu/home.png", alt: "홈", activeSrc: "/icon/menu/home-active.png", path: '/' },
        { src: "/icon/menu/graph.png", alt: "소비리포트", activeSrc: "/icon/menu/graph-active.png", path: '/chart2' },
        { src: "/icon/menu/card.png", alt: "카드", activeSrc: "/icon/menu/card-active.png", path: '/cardmanagement' },
        {   src: "/icon/menu/menu.png", 
            alt: "메뉴", 
            activeSrc: "/icon/menu/menu-active.png", 
            path: '#'  //빈 path
        }
    ];

    const handleMenuClick = (index) => {
        setActiveIndex(index);
        setIsMenuVisible(index === 3); // index가 3이면 메뉴를 표시, 그렇지 않으면 숨김
    };
    const handleCloseSideMenu = () => {
        setIsMenuVisible(false); // 사이드 메뉴 닫기 기능
    };
    return (
        <>
          <footer className='footer-wrap'>
              <ul className='menu-list'>
                  {menuItems.map((item, index) => (
                      <li key={index}>
                          <Link 
                            to={item.path} 
                            onClick={(e) => {
                                if (index === 3) {
                                    e.preventDefault(); // 기본 링크 동작 방지
                                }
                                handleMenuClick(index);
                            }}
                          >
                              <img 
                                  src={activeIndex === index ? item.activeSrc : item.src} 
                                  alt={item.alt} 
                              />
                          </Link>
                      </li>
                  ))}
              </ul>
          </footer>
          {isMenuVisible && <Menu onClose={handleCloseSideMenu} isLoggedIn={isLoggedIn} userName={userName} />} {/* 메뉴가 보일 때만 렌더링 */}
        </>
    );
}

export default Footer;