import React, { useEffect, useState } from 'react';
import { generateRandomCardNumber, generateRandomCVVCode, getCurrentDate, getExpirationDate, useCardContext } from './CardContext';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';

function Card6(props) {
    const { produceCardOffer, setProduceCardOffer } = useCardContext();
    const navigate = useNavigate(); 
    const [displayCardOffer, setDisplayCardOffer] = useState(produceCardOffer); // 초기 상태 저장용
    const { t, i18n } = useTranslation();
    const changeLanguage = (selectedLanguage) => {
        
        const languageMap = {
            Korea: 'ko',
            English: 'en',
            Japan: 'jp',
            China: 'cn'
        };

        const languageCode = languageMap[selectedLanguage];
        i18n.changeLanguage(languageCode);
       
    };

    useEffect(() => {
        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }

        if (!produceCardOffer || !produceCardOffer.card_type_id) {
            console.error("Card type ID is missing or null");
            return;
        }

        const sendCardData = async () => {
            try {
                const today = new Date(); // 오늘 날짜 가져오기
                const selectedDate = new Date(today.getFullYear(), today.getMonth(), produceCardOffer.payment_date);

                // 선택된 일자가 오늘 일자보다 작은 경우 다음 달로 설정
                if (selectedDate < today) {
                    selectedDate.setMonth(today.getMonth() + 1);
                }

                const modifiedCardOffer = {
                    cardId: produceCardOffer.card_id,
                    cardNumber: produceCardOffer.card_number,
                    cvvCode: produceCardOffer.cvv_code,
                    cardBalance: produceCardOffer.card_balance,
                    cardStatus: produceCardOffer.card_status,
                    issueDate: produceCardOffer.issue_date,
                    expirationDate: produceCardOffer.expiration_date,
                    cardPassword: produceCardOffer.card_password,
                    cardPickup: produceCardOffer.card_pickup,
                    pickupDate: produceCardOffer.pickup_date,
                    cardAccount: produceCardOffer.card_account,
                    paymentBank: produceCardOffer.payment_bank,
                    paymentDate: produceCardOffer.payment_date 
                        ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(produceCardOffer.payment_date).padStart(2, '0')}` 
                        : null, // 날짜 형식 변환 또는 null 처리
                    transportation: produceCardOffer.transportation,
                    cardTypeId: produceCardOffer.card_type_id,
                    memberId: produceCardOffer.member_id,
                };

                console.log("Modified Card Offer:", modifiedCardOffer);

                const response = await axios.post('/api/card/insert', modifiedCardOffer, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // 초기화 전에 현재 상태를 displayCardOffer에 저장
                setDisplayCardOffer(produceCardOffer);

                // 상태 초기화
                setProduceCardOffer({
                    "card_id": null,
                    "card_account": null,
                    "card_balance": 0, 
                    "card_number": generateRandomCardNumber(), // 새로운 카드 번호 생성
                    "card_password": null,
                    "card_pickup": null,
                    "card_status": true,
                    "cvv_code": generateRandomCVVCode(), // 새로운 CVV 코드 생성
                    "expiration_date": getExpirationDate(), // 새로운 만료일 설정
                    "issue_date": getCurrentDate(), // 새로운 발급일 설정
                    "payment_bank": null,
                    "payment_date": null,
                    "pickup_date": null,
                    "transportation": null,
                    "card_type_id": null,
                    "member_id": null
                });

            } catch (error) {
                console.error('Error sending card data:', error);
            }
        };

        sendCardData();
    }, [produceCardOffer, setProduceCardOffer]);

    return (
        <div style={{ marginTop: '160px', marginBottom: '100px' }}>
            <div style={{ margin: 'auto 50px' }}>
                <h3 style={{ marginBottom: '60px' }}>{t('CompletedCard')}</h3>
                {displayCardOffer.card_type_id ? (
                    <img
                        src={require(`../../assets/Card${displayCardOffer.card_type_id}.png`)}
                        alt="카드 이미지"
                        width={'180px'}
                        height={'270px'}
                        style={{
                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.6), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                            borderRadius: '15px'
                        }}
                    />
                ) : (
                    <p>{t('NotExist')}</p>  // card_type_id가 없는 경우 메시지 출력
                )}
                <Button
                    variant="contained"
                    style={{
                        width: '50%',
                        padding: '12px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginTop: '60px'
                    }}
                     onClick={() => navigate('/')}
                >
                    {t('Home')}
                </Button>
            </div>
        </div>
    );
}

export default Card6;
