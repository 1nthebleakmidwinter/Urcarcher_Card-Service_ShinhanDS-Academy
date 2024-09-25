import 'assets/exchangeCurrency.css';
import CNY from 'assets/icon-nation/icon-cn.png';
import JPY from 'assets/icon-nation/icon-jp.png';
import KRW from 'assets/icon-nation/icon-kr.png';
import USD from 'assets/icon-nation/icon-us.png';
import 'assets/Language.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { flagImg } from 'pages/exchangeRate/FlagImg';

function ExchangeCurrency(props) {
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

    const [exchangeCurInfo, setExchangeCurInfo] = useState({});
    const [wscData, setWscData] = useState();
    const cwsc = useRef(null);

    // 이전 페이지에서 보낸 선택한 카드 정보
    const location = useLocation();
    const cardId = location.state.selectCard;
    const [exCard, setExCard] = useState(cardId);

    console.log("선택한 카드 정보 받기", exCard);
    console.log("선택한 카드 아이디 받기", exCard.cardId);
    // console.log(typeof exCard);
    
    const [nation, setNation] = useState(""); // 사용자 국적
    const exchangeType = [{nt: "USD", cr: "$"}, {nt: "JPY", cr: "￥"}, {nt: "CNY", cr: "Y"}]; // 통화 기호
    const curImg = {USD : USD, JPY : JPY, CNY : CNY};

    const [focused, setFocused] = useState(false);
    const [inputWidth, setInputWidth] = useState(300); // 글자 너비 기본값 (15px)
    const [currency, setCurrency] = useState(0); // 사용자가 입력한 KRW
    const [calculateAmount, setCalculateAmount] = useState(0); // 예상 원화
    
    const navi = useNavigate();

    // 처음 렌더링 될 때만 웹소켓 연결
    useEffect(()=>{
        const savedLanguage = Cookies.get('selectedLanguage');

        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }
        
        wsConnect();
    }, []);

    // 웹소켓 연결 설정
    const wsConnect = useCallback(()=>{
        cwsc.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_SERVICE_URL);

        cwsc.current.onmessage = (message) => {
            const rcvData = JSON.parse(message.data);
            setWscData(rcvData);
        };
    });

    useEffect(() => {
        if (wscData !== undefined) {
            const id = wscData.exchangeType;
            const updateExchangeCurInfos = { ...exchangeCurInfo, [id]: wscData };
            setExchangeCurInfo(updateExchangeCurInfos);
        }
    }, [wscData, exchangeCurInfo]);

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

    // 국적 별 이미지 url
    // const imgUrl = curImg[nation] || KRW; // 기본값 태국기

    // input 클릭 시 초기화
    const focusHandle = () => {
        if (!focused) {
            setCurrency("");
            setFocused(true);
        }
    };

    // 숫자만 입력 가능
    const keyDownHandle = (event) => {
        // 숫자, 백스페이스, 삭제, 화살표 키 등만 허용
        const keys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];

        // 숫자 키, 허용된 키가 아닐 경우
        if ((event.key < "0" || event.key > "9") && !keys.includes(event.key)) {
            event.preventDefault();
        }
    }

    // 입력한 값이 숫자일 때만 상태값 변경
    const numberHandle = (event) => {
        const inputVal = event.target.value;
        // 세 자리 수 마다 콤마 찍기 위해 타입 변환
        const numCur = Number(inputVal.replace(/[^0-9]/g, ""));

        setCurrency(numCur.toLocaleString());
        setInputWidth(inputVal.length * 20); // 동적으로 input 길이 변경

        if (exchangeCurInfo[nation] && exchangeCurInfo[nation].rate && exchangeCurInfo[nation].buy) {
            // 쉼표 제거 후 문자열을 숫자로 변환 (NaN 발생)
            const nationRate = parseFloat(exchangeCurInfo[nation].rate.replace(/,/g, "")); // 매매기준율
            const buyRate = parseFloat(exchangeCurInfo[nation].buy.replace(/,/g, "")); // 현찰 살 때

            // 환율 우대 90% 적용된 예상 원화 계산
            // 매매기준율 + (현찰 살 때 - 매매기준율) * (1 - 환율 우대율)
            if (!isNaN(nationRate) && !isNaN(buyRate)) {
                const discountRate = 0.9;
                const appliedRate = nationRate + (buyRate - nationRate) * (1 - discountRate);
                const calculatAmt = (numCur / appliedRate).toFixed(2); // 소수점 두 자리까지

                setCalculateAmount(calculatAmt); // 계산된 예상 원화
            } else {
                setCalculateAmount(0); // 환율 정보 없음
            }
        } else {
            setCalculateAmount(0); // 환율 정보 없음
        }
    };

    // 환율 우대 90% 적용해서 계산
    // 매매기준율 + (살 때 환율 - 매매기준율) * (1 - 환율 우대율)
    /*
    const exchangeCurHandle = (amount, rate, buy) => {
        const discountRate = 0.9;
        const exchange = rate + (buy - rate) * (1 - discountRate);
        const money = amount / exchange;

        return money.toFixed(2); // 소수점 두 자리까지
    };
    */

    // 환전 내역에 insert
    const insertHandle = () => {
        // 충전 금액 확인
        if (!currency || parseFloat(currency.replace(/,/g, "")) <= 0) {
            alert(t('EnterAmountAboveZero'));
            return;
        }

        // 환율 확인
        if (!exchangeCurInfo || !exchangeCurInfo[nation] || !exchangeCurInfo[nation].rate) {
            alert(t('FindingExchangeRateInfo'));
            return;
        }
    
        // 원화 확인
        if (!calculateAmount || parseFloat(calculateAmount) <= 0) {
            alert(t('CannotCalculateEstimatedKRW'));
            return;
        }

        const data = {
            cardId: exCard.cardId,
            exRate: parseFloat(exchangeCurInfo[nation].rate.replace(/,/g, "")), // 적용환율
            exCur: parseFloat(currency.replace(/,/g, "")), // 환전금액
            exPay: parseFloat(calculateAmount) // 결제금액
        };
    
        // axios.post("https://urcarcher-local.kro.kr:8443/api/exchange/insert", data, {
        axios.post("/api/exchange/insert", data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            console.log("바로 충전 성공", response.data);
            setExchangeCurInfo(response.data);
            
            navi("/exchange/success", {
                state: {
                    successMsg: response.data,
                    successData: data,
                    successPlus: exCard.cardBalance + (parseFloat(currency.replace(/,/g, "")))
                }
            });
        })
        .catch(error => {
            console.error("바로 충전 실패", error);

            alert(t('ProblemCharge'));
            navi("/");
            return;
        });
    };

    // 카운트 롤링 애니메이션
    // const countNum = () => {
    //     let countBox = document.querySelector("#count");
    //     let count = 0;
    //     let num = parseFloat(exchangeCurInfo[nation].rate.replace(/,/g, ""));
    //     let increment = num / 100; // 100번에 걸쳐 증가

    //     let counting = setInterval(function () {
    //         if (count >= num) {
    //             count = num;
    //             clearInterval(counting);
    //         } else {
    //             count += increment; // 조금씩 증가
    //         }
    //         countBox.innerHTML = new Intl.NumberFormat().format(count);
    //     }, 10);

    //     if (exchangeCurInfo[nation]) {
    //         countNum();
    //     }
    // };

    return (
        <div className="contents">
            <div className="exCur_title">
                <h4>{t('HowMuch')} <span style={{ color: "#476EFF" }}>{t('Charge')}</span>{t('DoYouWantToRecharge')}</h4>
            </div>
            <div className="exCur_wrapper">
                <div className="ex_cur_img">
                    <img src={KRW} alt="KRW"/>
                </div>
                <div className="ex_cur_text">
                    <h5>대한민국 KRW</h5>
                </div>
                <div className="exCur_div">
                    <input
                        name="exCur"
                        type="text"
                        value={currency === 0 || currency === null ? t('EnterAmountToRecharge') : currency}
                        onFocus={focusHandle}
                        onKeyDown={keyDownHandle}
                        onChange={numberHandle}
                        style={{ width: `${inputWidth}px`, color: currency === 0 || currency === null ? "#BFBFBF" : "black" }}
                        autoComplete="off"
                        />
                </div>
            </div>
            <div className="exAmt_wrapper">
                <div className="ex_cur_img">
                    <img src={t(flagImg(nation))} alt="국기"/> 
                </div>
                <div className="ex_cur_nation">
                    <h5>{nation}</h5>
                </div>
                <div className="ex_cur_nation">
                    <p className="exAmt_text">{calculateAmount}</p>
                    {exchangeCurInfo[nation] ? 
                    (<p id="count" style={{ color: "#BFBFBF" }}>1 { curSymbol(nation) } = {exchangeCurInfo[nation].rate} ￦</p>) : (<p style={{ color: "#BFBFBF" }}>{t('FindingExchangeRateInfo2')}</p>)}
                </div>
            </div>
            <div className="exRate_wrapper">
                <p style={{ fontFamily: "NanumSquareNeoExtraBold", textAlign: "left", marginLeft: "20px" }}>{t('ExchangeRateDiscount')}</p>
                <div className="exRate_table">
                    <div className="exRate_col">
                        <p className="exRate_left_text">{t('AppliedExchangeRate')}</p>
                        {exchangeCurInfo[nation] ? 
                        (<p className="exRate_right_text">KRW {exchangeCurInfo[nation].rate} = 1 { curSymbol(nation) }</p>) : (<p className="exRate_right_text">{t('FindingExchangeRateInfo2')}</p>)}
                    </div>
                    <div className="exRate_col">
                        <p className="exRate_left_text">{t('PreferentialTerms')}</p>
                        <p className="exRate_right_text">{t('ExchangeRateDiscount')} 90%</p>
                    </div>
                    <div className="exRate_line"></div>
                    <div className="exRate_col">
                        <p className="exRate_left_text">{t('EstimatedAmountInKRW')}</p>
                        <p className="exRate_right_text">{calculateAmount} { curSymbol(nation) }</p>
                    </div>
                </div>
            </div>
            <div className="exRate_plus_wrapper">
                <button className="exRate_plus_btn" onClick={insertHandle}>{t('Recharge')}</button>
            </div>
        </div>
    );
}

export default ExchangeCurrency;