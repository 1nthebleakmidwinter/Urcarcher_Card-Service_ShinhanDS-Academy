import React, { useEffect, useState } from 'react';
import US_Icon  from 'assets/icon-nation/icon-us.png';
import Japan_Icon from 'assets/icon-nation/icon-jp.png';
import China_Icon from 'assets/icon-nation/icon-cn.png';
import Korea_Icon from 'assets/icon-nation/icon-kr.png';
import Cookies from 'js-cookie'; 

function SelectLanguage(props) {  //Home.jsx 연결

    /* 모달창 */
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Korea');
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const options = ['English', 'Japan', 'China', 'Korea'];

    // 나라에 해당하는 이미지 경로를 객체로 관리
    const countryIcons = {
        English: US_Icon,
        Japan: Japan_Icon,
        China: China_Icon,
        Korea: Korea_Icon
    };
    useEffect(() => {
        // 쿠키에서 언어 값을 가져와서 설정
        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            setSelectedOption(savedLanguage);
        } else {
            setSelectedOption('Korea');
        }
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);  // *
        // setSelectedOption(setSelectedOption); //*
        setIsModalOpen(true);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        // 선택한 언어를 쿠키에 저장 (1년 동안 유지되도록 설정)
        Cookies.set('selectedLanguage', option, { expires: 30 });
        props.changeLanguage(option);
        // 모달창 닫기
        setIsModalOpen(false);
    };

    const closeModal = (e) => {
        // 모달 바깥 영역을 클릭했을 때만 모달을 닫음
        if (e.target.className === 'lang-modal-overlay') {
            setIsModalOpen(false);
        }
    };
    const getDisplayLanguage = (option) => {
        switch (option) {
            case 'Korea':
                return '한국어';
            case 'Japan':
                return '日本語';
            case 'China':
                return '中文';
            case 'English':
                return 'English';
            default:
                return option;
        }
    };
    return (
        <div className="lang-custom-dropdown">
            {/* 모달창 */}
            {isModalOpen && (
                <div className="lang-modal-overlay" onClick={closeModal}>
                    <div className="lang-modal-contents">
                        <h3 style={{textAlign:'left', wordBreak:'keep-all'}}>여러분의 언어를 선택하세요</h3>
                        <h5>현재 언어</h5>
                        <div className="lang-modal-list">
                        {/* 조건 추가 */}
                        {selectedOption && (
                            <p className='lang-active'>
                                <img src={countryIcons[selectedOption]} alt="나라" style={{width:'30px' }} /> 
                                <span style={{display:'block', lineHeight:'30px'}}>
                                    {/* {selectedOption === 'Korea' ? '한국어' : selectedOption} */}
                                    {getDisplayLanguage(selectedOption)}
                                </span>
                            </p>
                        )}
                        </div>
                        <h5>언어 선택</h5>
                        <div className="lang-modal-list">
                            {options.map((option, index) => (
                                <p key={index} 
                                   onClick={() => handleOptionClick(option)} 
                                   className='lang-txt'
                                >
                                    <img src={countryIcons[option]} alt="나라" style={{width:'30px' }} /> 
                                    <span style={{display:'block', lineHeight:'30px'}}>{option}</span>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div className="lang-dropdown-selected" onClick={toggleDropdown}>
                <p>🌐</p>
                <p className='selected-nation'>Language</p>
            </div>
        </div>
    );
}

export default SelectLanguage;