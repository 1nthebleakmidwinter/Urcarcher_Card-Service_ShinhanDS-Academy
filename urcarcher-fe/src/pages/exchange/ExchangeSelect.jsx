import exchangeArrow from 'assets/arrow.png';
import cardAndCoin from 'assets/exchange/credit-card-and-coins.png';
import 'assets/exchangeSelect.css';
import 'assets/Language.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { options_GET } from 'services/CommonService';

function ExchangeSelect(props) {
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

    // 로그인 유저 정보
    const [memberId, setMemberId] = useState('');
    const [name, setName] = useState('');
    const [nation, setNation] = useState(""); // 사용자 국적

    const [loading, setLoading] = useState(true);

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

    useEffect(()=>{
        const savedLanguage = Cookies.get('selectedLanguage');

        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }
        
        isAuthorized();
    },[]);

    console.log("로그인 유저 id", memberId);
    console.log("로그인 유저 name", name);

    const navi = useNavigate();

    // 카드 선택 페이지로 이동
    const exchangeHandle = (event) => {
        // 카드 선택 후 버튼 종류에 따라 다른 페이지 보여주기 위해
        const selectBtn = event.currentTarget.id;

        // 로그인 확인
        if (!memberId && !name) {
            alert(t('LoginRequired'));
            navi("/");
            return;
        }

        // 내국인 여부 확인
        if (nation === "") {
            alert(t('NationCheck'));
            navi("/cardmanagement");
            return;
        }

        navi("/exchange/card", { state: { selectBtn } });
    };

    // 환전 내역
    const historyHandle = () => {
        // 로그인 확인
        if (!memberId && !name) {
            alert(t('LoginRequired'));
            navi("/");
            return;
        }

        // 내국인 여부 확인
        if (nation === "") {
            alert(t('NationPayCheck'));
            navi("/usage");
            return;
        }

        navi("/exchange/history/card");
    }

    return (
        <div className="contents">
            <div className="exchange_select_wrapper">
                <div className="exchange_select_title">
                    <h5>어카처{t('ConvenientExchange')}</h5>
                    <h5>{t('UseImmediately')}</h5>
                </div>
                <div className="exchange_select_content">
                    <p>{t('MobileExchange')}</p>
                    <p>{t('UseAnytimeAnywhere')}</p>
                </div>
                <div className="exchange_select_card fly_card">
                    <img src={cardAndCoin} alt="카드 & 코인"/>
                </div>
                <div className="select_btn_wrapper">
                    <button className="select_info_btn" onClick={historyHandle}>{t('ViewHistory')}</button>
                    <button id="currency" className="select_cur_btn" onClick={exchangeHandle}>{t('Charge')}</button>
                </div>
                <div className="exchange_select_title2">
                    <h5>{t('HowAboutThisMethod')}</h5>
                </div>
                <div className="select_btn_wrapper2">
                    <button id="set" className="select_set_btn" onClick={exchangeHandle}>
                        <p className="select_set_p">{t('AutoRechargeAtReservedRate')}</p>
                        <img src={exchangeArrow} alt="화살표 아이콘"/>
                        <p>{t('AutoExchangeOnReservedDate')}</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExchangeSelect;