import 'assets/exchangeHistory.css';
import 'assets/Language.css';
import axios from 'axios';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import money from 'assets/exchange/coin-and-banknotes.png';

function ExchangeHistoryDetail(props) {
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
    const location = useLocation();
    const historyNo = location.state.exId;
    const [detailHistory, setDetailHistory] = useState({});

    console.log("상세 조회 아이디", historyNo);

    const [nation, setNation] = useState(""); // 사용자 국적
    const exchangeType = [{nt: "USD", cr: "$"}, {nt: "JPY", cr: "￥"}, {nt: "CNY", cr: "Y"}]; // 통화 기호

    // 환전 내역 상세 조회
    useEffect(() => {
        const savedLanguage = Cookies.get('selectedLanguage');

        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }

        axios.get(`/api/exchange/detail/${historyNo}`)
        .then((response) => {
            setDetailHistory(response.data);
            console.log("상세 조회 데이터", response.data);
        })
        .catch((error) => {
            console.log("상세 조회 실패", error);
        });
    }, []);

    // 로그인 유저 국적 조회
    useEffect(() => {
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

    // 충전 버튼
    const exchangeHandle = () => {
        navi("/exchange");
    };

    // 목록 버튼
    const backHandle = () => {
        navi(-1);
    };

    return (
        <div className="contents">
            <div className="ex_history_wrpper">
                <span>대한민국 KRW</span>
                <h3>￦ {Number(detailHistory.cardBalance).toLocaleString()}</h3>
                <div className="ex_history_btn_wrpper">
                    <button className="ex_go_change_btn" onClick={exchangeHandle}>{t('Charge')}</button>
                </div>
            </div>
            <div className="ex_history_detail_img_box fallMoney">
                <img src={money} alt="돈"/>
            </div>
            <div className="ex_history_detail_container">
                <h4>{detailHistory.setId === null ? t('AmountRecharged') : t('AutoRechargeSuccess')}</h4>
            </div>
            <div className="ex_history_detail_content">
                <div className="ex_history_detail_text_box">
                    <p className="ex_history_detail_left">{t('RechargeDateTime')}</p>
                    <p className="ex_history_detail_right">{dayjs(detailHistory.exDate).format("YYYY-MM-DD")}</p>
                </div>
                <div className="ex_history_detail_text_box">
                    <p className="ex_history_detail_left">{t('RechargeAmount')}</p>
                    <p className="ex_history_detail_right">￦ {Number(detailHistory.exCur).toLocaleString()}</p>
                </div>
                <div className="ex_history_detail_text_box">
                    <p className="ex_history_detail_left">{t('KRWAmount')}</p>
                    <p className="ex_history_detail_right">{ curSymbol(nation) } {detailHistory.exPay}</p>
                </div>
                <div className="ex_history_detail_text_box">
                    <p className="ex_history_detail_left">{t('RechargeExchangeRate')}</p>
                    <p className="ex_history_detail_right">KRW {detailHistory.exRate} = 1 { curSymbol(nation) }</p>
                </div>
                <div className="ex_history_detail_text_box">
                    <p className="ex_history_detail_left">{t('TotalPaymentAmount')}</p>
                    <p className="ex_history_detail_right">{ curSymbol(nation) } {detailHistory.exPay}</p>
                </div>
                <div className="ex_history_detail_text_box">
                    <p className="ex_history_detail_left">{t('WithdrawalAccount')}</p>
                    <p className="ex_history_detail_right">Citi Bank</p>
                </div>
                <div className="ex_history_detail_text_box">
                    <p className="ex_history_detail_left">{t('RechargeDetails')}</p>
                    <p className="ex_history_detail_right">{detailHistory.setId === null ? t('InstantRecharge') :  t('AutoRecharge') }</p>
                </div>
            </div>
            <div className="ex_history_detail_btn">
                <button onClick={backHandle} className="ex_history_go_btn">{t('ViewList')}</button>
            </div>
        </div>
    );
}

export default ExchangeHistoryDetail;