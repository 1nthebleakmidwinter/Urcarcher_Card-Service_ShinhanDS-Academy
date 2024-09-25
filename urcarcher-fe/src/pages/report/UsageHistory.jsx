import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from 'assets/urcarcher-logo.png';
import Axios from 'axios';
import Preloader from 'bootstrap-template/components/Preloader';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';


function UsageHistory(props) {

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


    const [usage, setUsage] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [groupedUsage, setGroupedUsage] = useState({});
    const [cardInfo, setCardInfo] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [cardTypes, setCardTypes] = useState([]); // 카드 타입 정보 저장
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }


        setLoading(true); // 데이터 로딩 시작 시 로딩 상태 활성화
        axios.get('/api/t/test')
            .then(response => {
                const memberData = response.data;

                axios.post('/api/payment/by-member', { memberId: memberData.memberId })
                    .then(paymentResponse => {
                        const payments = paymentResponse.data;

                         // payments가 배열인지 확인
                        if (!Array.isArray(payments)) {
                            console.error('Invalid data format for payments:', payments);
                            setUsage([]);
                            setTotalPrice(0);
                            setPaymentHistory([]);
                            setLoading(false);
                            return;
                        }

                        setUsage(payments);
                        updateGroupedUsage(payments); // 전체 결제 내역을 그룹화하여 상태에 저장

                        const total = payments.reduce((acc, curr) => acc + curr.paymentPrice, 0);
                        setTotalPrice(total);

                        setPaymentHistory(payments); // 전체 결제 내역을 상태에 저장
                        setLoading(false); // 데이터 로딩 완료 후 로딩 상태 비활성화
                    })
                    .catch(paymentError => {
                        console.error('Error fetching payment data:', paymentError.response || paymentError.message);
                        setLoading(false); // 오류 발생 시에도 로딩 상태 비활성화
                    });

                getMemberId(memberData.memberId);
                loadCardTypes(); // 카드 타입 정보 로드
            })
            .catch(error => {
                console.error('Error fetching member data:', error);
                setLoading(false); // 오류 발생 시에도 로딩 상태 비활성화
            });
    }, []);

    const getMemberId = (memberId) => {
        axios.get(`/api/card/mycard/${String(memberId)}`)
            .then((response) => {
                const cards = response.data;
                setCardInfo(cards);
                console.log(cards);
            })
            .catch((error) => {
                alert('카드 정보 불러오는데 오류발생');
            });
    };

    // 카드 종류 정보들
    const loadCardTypes = () => {
        axios.get('/api/cards')
            .then((response) => {
                setCardTypes(response.data);
            })
            .catch((error) => {
                console.error('Error loading card types:', error);
            });
    };

    const cardName = (cardTypeId) => {
        const cardType = cardTypes.find(card => card.cardTypeId === cardTypeId);
        return cardType ? cardType.cardName : 'Unknown Card';
    };


    const updateGroupedUsage = (payments) => {
        const groupedData = payments.reduce((acc, curr) => {
            const date = new Date(curr.paymentDate);
            const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            if (!acc[month]) {
                acc[month] = [];
            }
            acc[month].push(curr);
            return acc;
        }, {});

        Object.keys(groupedData).forEach(month => {
            groupedData[month].sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));
        });

        setGroupedUsage(groupedData);
    };

    const handleCardSelect = (event) => {
        setLoading(true); // 카드 선택 시 로딩 상태 활성화
        const selectedCardId = event.target.value;

        if (selectedCardId === 'All') {
            setSelectedCard(null);
            setPaymentHistory(usage); // 전체 결제 내역을 다시 설정
            updateGroupedUsage(usage); // 전체 결제 내역을 그룹화하여 업데이트
            const total = usage.reduce((acc, curr) => acc + curr.paymentPrice, 0); // 전체 결제 내역 금액 계산
            setTotalPrice(total);
            setLoading(false); // 데이터 로딩 완료 후 로딩 상태 비활성화
            return;
        }

        Axios.get(`/api/card/get/${selectedCardId}`)
            .then((response) => {
                const result = response.data;
                setSelectedCard(result);

                Axios.post("/api/payment/paymenthistory", { cardId: String(result.cardId) })
                    .then((response) => {
                        const payments = response.data;
                        setPaymentHistory(payments); // 선택된 카드의 결제 내역만 저장
                        updateGroupedUsage(payments); // 선택된 카드의 결제 내역을 그룹화하여 업데이트

                        const total = payments.reduce((acc, curr) => acc + curr.paymentPrice, 0); // 선택된 카드의 총 금액 계산
                        setTotalPrice(total);
                        setLoading(false); // 데이터 로딩 완료 후 로딩 상태 비활성화
                    })
                    .catch((error) => {
                        console.log("카드별 결제내역 가져오는 부분에서 에러발생");
                        setLoading(false); // 오류 발생 시에도 로딩 상태 비활성화
                    });
            })
            .catch((error) => {
                console.error("카드 정보 불러오는데 오류발생", error);
                setLoading(false); // 오류 발생 시에도 로딩 상태 비활성화
            });
    };

    const translatedCardName = (cardTypeId) => {
        const name = cardName(cardTypeId);
        return name.replace('카드', t('Card'));
    };

    return (
        <div>
            {loading && <Preloader type={'pulse'} variant={'primary'} center={true} />}
            <div className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
                <div style={{ marginTop: '100px', marginBottom: '100px' }}>
                    <div style={{
                        height: '150px', margin: '10px 20px', borderRadius: '10px', padding: '15px 20px',
                        boxShadow: '5px 5px 10px gray', background: '#EDF1FF'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <img src={Logo} alt="로고" style={{ width: '100px' }} />
                            <div style={{ display: 'flex', fontSize: '13px' }}>
                                <select
                                    style={{ fontWeight: 'bold', fontSize: '13px', backgroundColor: '#EDF1FF', border: 'none', outline: 'none' }}
                                    onChange={handleCardSelect}
                                >
                                    <option value="All">{t('AllCards')}</option>
                                    {cardInfo.map((card, index) => (
                                        <option key={index} value={card.cardId}>{translatedCardName(card.cardTypeId)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', marginBottom: '10px', fontSize: '13px', marginTop: '24px' }}>
                            <div>{selectedCard && selectedCard.paymentBank}</div>
                            <div>
                                &nbsp;
                                {selectedCard && selectedCard.cardAccount
                                    ? selectedCard.cardAccount.replace(/(\d{4})(?=\d)/g, '$1-')
                                    : ''}
                            </div>
                        </div>

                        <h2 style={{ justifyContent: 'flex-start', display: 'flex', color: '#064AFF' }}>{totalPrice.toLocaleString()}{" "+t('Won')}</h2>
                    </div>

                    <div style={{ margin: '40px 20px' }}>
                        {paymentHistory && paymentHistory.length > 0 ? (
                            Object.keys(groupedUsage).sort((a, b) => new Date(b) - new Date(a)).map((month, index) => (
                                <div key={index}>
                                    <h5 style={{ justifyContent: 'flex-start', display: 'flex' }}>{month.replace('-', t('Year'))}{t('Month')}</h5> {/* 월별 헤더 */}
                                    {groupedUsage[month].map((usage, idx) => (
                                        <div style={{ display: 'flex', margin: '25px auto', justifyContent: 'space-between', alignItems: 'center' }} key={idx}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                <img src={require('../../assets/Arrow2.png')} alt='' />
                                            </div>
                                            <div style={{ flex: 1, marginLeft: '20px' }}>
                                                <div style={{ fontWeight: 'bold', textAlign: 'start' }}>{usage.storeName}</div>
                                                <div style={{ textAlign: 'start' }}>{new Date(usage.paymentDate).toLocaleString()}</div>
                                            </div>
                                            <div style={{ fontWeight: 'bold', color: '#064AFF' }}>{usage.paymentPrice.toLocaleString()}{" "+t('Won')}</div>
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <div>{t('NoPaymentHistory')}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UsageHistory;
