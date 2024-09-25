import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // useTranslation 훅 가져오기
import 'components/Header.css';
import { getTitle } from 'components/Pathname.js';  // 경로에 맞는 제목 설정 함수 임포트
import Logo from 'assets/urcarcher-logo.png';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();  // 번역 훅 초기화

    return (
        <header>
            <div className='header-wrap'>
            {location.pathname === '/' ? (
            <p className='home-logo'>
                <img src={Logo} alt="로고" style={{width:'170px'}} />
            </p>
            ) : (
            <>
                <button onClick={() => navigate(-1)} style={{marginLeft:'15px'}}>
                    <img src="/icon/left-arrow.png" alt="화살표" />
                </button>
                <h5>{t(getTitle(location.pathname))}</h5> {/* t() 함수로 제목 번역 */}
            </>
            )}
            </div>
        </header>
    );
}

export default Header;
