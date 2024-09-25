import 'assets/exchangeSet.css';
import 'assets/Language.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import ExchangeSetList from './ExchangeSetList';
import ExchangeSetNull from './ExchangeSetNull';

function ExchangeSet(props) {
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

    // 이전 페이지에서 보낸 선택한 카드 정보
    const location = useLocation();
    const setCard = location.state.selectCard;
    const [reserveCard, setReserveCard] = useState(setCard);
    
    console.log("선택한 카드 정보 받기", setCard);
    console.log("선택한 카드 아이디 받기", reserveCard.cardId);

    const navi = useNavigate();

    const [reserveInfo, setReserveInfo] = useState({}); // 예약 정보

    // 카드에 예약 내역이 있는지 조회
    useEffect(() => {
        const savedLanguage = Cookies.get('selectedLanguage');

        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }

        axios.get(`/api/exchange/rate/detail/${reserveCard.cardId}`)
            .then((response) => {
                setReserveInfo(response.data);
                console.log("예약 카드 조회", response.data);
            })
            .catch((error) => {
                console.log("예약 카드 조회 실패", error);
            });
    }, []);

    // 자동 충전 설정 페이지
    const exchangeSetHandle = () => {
        navi("/exchange/set/rate", { state: { reserveCard } });
    };

    return (
        <div className="contents">
            <div className="exchange_set_wrapper">
                <h4>
                    어카처{t('From')} <span style={{ color: "#476EFF" }}>{t('PredictedExchangeRate')}</span>{t('With')}
                </h4>
                <h4>{t('AutoRecharge2')}</h4>
            </div>
            <>
                {Object.keys(reserveInfo).length === 0 ? (
                    /* 설정 없음 */
                    <ExchangeSetNull exchangeSetHandle={exchangeSetHandle}/>
                ) : (
                    /* 설정 있음 */
                    <ExchangeSetList reserveInfo={reserveInfo}/>
                )}
            </>
        </div>
    );
}

export default ExchangeSet;