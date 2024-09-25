import calender from 'assets/exchange/calender-won.png';
import 'assets/exchangeSetSuccess.css';
import 'assets/Language.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

function ExchangeSetSuccess(props) {
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
    const navi = useNavigate();

    const settingData = location.state.successData;
    const settingCard = location.state.successCard;
    console.log("settingData", settingData);
    console.log("settingCard", settingCard);

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

    // 홈 버튼
    const homeHandle = () => {
        navi("/exchange");
    };

    // 환전 내역
    const inforListHandle = () => {
        navi("/exchange/history/card");
    };

    return (
        <div className="contents">
            <div className="ex_setting_wrapper">
                <h4>
                    <span style={{ color: "#476EFF" }}>{t('ReservationExchange')}</span>
                </h4>
                <h4>{t('HasBeenSet')}</h4>
            </div>
            <div className="ex_setting_img_box">
                <img src={calender} alt="달력"/>
            </div>
            <div className="ex_setting_table_box">
                <div className="ex_setting_table">
                    <h5>대한민국 KRW</h5>
                    <div className="ex_setting_col">
                        <p className="ex_setting_p">{t('ReservationDate')}</p>
                        <h5>{settingData.setDate}</h5>
                    </div>
                    <div className="ex_setting_col">
                        <p className="ex_setting_p">{t('Automatically')}</p>
                        <h5>
                            <span style={{ fontFamily: "NanumSquareNeoHeavy", color: "#476EFF" }}>
                                KRW {settingData.setCur.toLocaleString()}
                            </span> {t('RechargeAnd')}
                        </h5>
                    </div>
                    <div className="ex_setting_col">
                        <p className="ex_setting_p">{t('EstimatedKRW')}</p>
                        <h5>
                            <span style={{ fontFamily: "NanumSquareNeoHeavy", color: "#476EFF" }}>
                            {nation} {settingData.setPay}
                            </span> {t('WillWithdraw')}
                        </h5>
                    </div>
                </div>
                <div className="ex_setting_box_text">
                    <h5>{t('AutoRechargeSetSuccess')}</h5>
                    <h5>{t('AutoRechargeOnReservationDate')}</h5>
                </div>
                <div className="ex_setting_btn_box">
                    <button className="set_setting_info_btn" onClick={inforListHandle}>{t('ViewHistory')}</button>
                    <button className="set_setting_home_btn" onClick={homeHandle}>{t('Confrim')}</button>
                </div>
            </div>
        </div>
    );
}

export default ExchangeSetSuccess;