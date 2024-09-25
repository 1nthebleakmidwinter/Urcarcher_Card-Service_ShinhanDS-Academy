import calender from 'assets/exchange/calender-won.png';
import 'assets/exchangeSetList.css';
import doneImg from "assets/icons-done.gif";
import 'assets/Language.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function ExchangeSetList({ reserveInfo }) {
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

    const navi = useNavigate();
    const [countdown, setCountdown] = useState(3);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    console.log("예약 조회 페이지 data", reserveInfo);

    const [nation, setNation] = useState(""); // 사용자 국적
    const exchangeType = [{nt: "USD", cr: "$"}, {nt: "JPY", cr: "￥"}, {nt: "CNY", cr: "Y"}]; // 통화 기호

    // 로그인 유저 국적 조회
    useEffect(() => {
        const savedLanguage = Cookies.get('selectedLanguage');
        
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }

        axios.get("/api/exchange/find")
        .then((response) => {
            console.log(response.data);
            setNation(response.data);
        })
        .catch((error) => {
            console.log("국적 조회 실패", error);
        });
    }, []);

    // 국적 별 통화 기호
    const curSymbol = (nation) => {
        const foundCur = exchangeType.find(cur => cur.nt === nation);
        // 배열에 유저의 국적과 일치하는 국적이 없으면 $ 보이도록
        return foundCur ? foundCur.cr : "$";
    };

    // 삭제 버튼
    const deleteHandle = () => {
        axios.delete(`/api/exchange/rate/delete/${reserveInfo.setId}`)
        .then((response) => {
            // navi("/exchange");
            setShowSuccessModal(true); // 성공 메시지 모달 표시
            startCountdown(); // 카운트다운 시작
        })
        .catch(error => {
            console.log(error);
            alert(t('PleaseTryAgain'));
        });
    };

    // 카운트다운 시작 함수
    const startCountdown = () => {
        setCountdown(3); // 3초부터 시작

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    // 일정 시간 후 페이지 이동
                    navi('/exchange'); // 3초 후 페이지 이동
                }
                return prev - 1;
            });
        }, 1000); // 1초마다 카운트 감소
    };

    // 홈 버튼
    const homeHandle = () => {
        navi("/exchange");
    };

    return (
        <div className="ex_set_list_wrapper">
            <div className="ex_set_list_img_box">
                <img src={calender} alt="달력"/>
            </div>
            <div className="ex_set_list_table">
                <h5>대한민국 KRW</h5>
                <div className="ex_set_list_col">
                    <p className="ex_set_list_p">{t('ReservationDate')}</p>
                    <h5>{reserveInfo.setDate}</h5>
                </div>
                <div className="ex_set_list_col">
                    <p className="ex_set_list_p">{t('Automatically')}</p>
                    <h5>
                        <span style={{ fontFamily: "NanumSquareNeoHeavy", color: "#476EFF" }}>
                            KRW {reserveInfo.setCur.toLocaleString()}
                        </span> {t('RechargeAnd')}
                    </h5>
                </div>
                <div className="ex_set_list_col">
                    <p className="ex_set_list_p">{t('EstimatedKRW')}</p>
                    <h5>
                        <span style={{ fontFamily: "NanumSquareNeoHeavy", color: "#476EFF" }}>
                        {nation} {reserveInfo.setPay}
                        </span> {t('WillWithdraw')}
                    </h5>
                </div>
            </div>
            <div className="ex_set_list_text">
                <h5>{t('AutoRechargeSet')}</h5>
                <h5>{t('AutoRechargeOnReservationDate')}</h5>
            </div>
            <div className="ex_set_list_btn">
                <button className="set_delete_btn" onClick={deleteHandle}>{t('Delete')}</button>
                <button className="set_home_btn" onClick={homeHandle}>{t('Confrim')}</button>
            </div>
            {/* 예약 취소 모달 */}
            {showSuccessModal && (
                <div className="reservation-modal-overlay">
                    <div className="reservation-modal-content">
                        <img src={doneImg} alt="완료" style={{margin:'10px 0 20px', opacity:'0.5'}}/>
                        <h3 style={{marginBottom:'25px', color:'#476eff'}}>{t('DeleteExchange')}
                            <br />
                        </h3>
                        <span>{t('page')} {countdown} {t('goPage')}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExchangeSetList;