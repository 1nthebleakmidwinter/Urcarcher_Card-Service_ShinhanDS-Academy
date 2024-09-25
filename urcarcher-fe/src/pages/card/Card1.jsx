import React, { useState, useEffect } from 'react';
import '../../assets/Card.css';
import Flickity from 'react-flickity-component';
import axios from 'axios';
import { useCardContext } from './CardContext';
import { useNavigate } from 'react-router-dom';
import CardOverlay from 'bootstrap-template/components/cards/CardOverlay';
import ProgressBar from './ProgressBar';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';



function Card1() {
    const [selectedCard, setSelectedCard] = useState(null); // 선택된 카드 저장
    const [cards, setCards] = useState([]); // API에서 가져온 카드 목록을 저장
    const [cardInfo, setCardInfo] = useState([]); // 멤버가 보유한 카드 정보
    const [memberId, setMemberId] = useState(''); // 멤버 ID를 저장
    const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 상태를 관리
    const [showModal, setShowModal] = useState(false); // 모달 창 상태
    const { produceCardOffer, setProduceCardOffer } = useCardContext();
    const [translatedCardName, setTranslatedCardName] = useState('card');
    let navigate = useNavigate();
    
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
    


    const flickityOptions = {
        cellAlign: 'center',
        pageDots: false,
        groupCells: '20%',
        selectedAttraction: 0.03,
        friction: 0.15,
    };
    console.log("selectedCard:",selectedCard);
    //translatedCardName(selectedCard.cardName.replace('카드', t('Card')));
    const translatedCardName1 = (event) => {
        return selectedCard.cardName.replace('카드', t('Card'));
    }  
    useEffect(() => {
        
        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }

        const fetchData = async () => {
            setIsLoading(true); // 로딩 상태 활성화
            try {
                
                // 전체 카드 목록 가져오기
                const allCardsResponse = await axios.get('/api/cards');
                setCards(allCardsResponse.data);
                if (allCardsResponse.data.length > 0) {
                    setSelectedCard(allCardsResponse.data[0]); // 첫 번째 카드 선택
                   
                }
                const memberResponse = await axios.get('/api/t/test');
                const memberData = memberResponse.data;
                setMemberId(memberData.memberId); // 멤버 ID 설정

                // 멤버의 카드 정보 가져오기
                const cardResponse = await axios.get(`/api/card/mycard/${String(memberData.memberId)}`);
                const cards = cardResponse.data;
                setCardInfo(cards);
                console.log("멤버가 발급한 카드 정보:", cards)


                setIsLoading(false); // 로딩 상태 비활성화
            
                
            } catch (error) {
                console.error('Error fetching data:', error.response || error.message);
                setIsLoading(false); // 오류 발생 시에도 로딩 상태 비활성화
            }
            
        };

        fetchData(); // 데이터 가져오기 함수 실행
    }, []);
    
    const handleChange = (index) => {
        if (cards.length > 0 && index < cards.length) {
            setSelectedCard(cards[index]);

        } else {
            console.log("카드 데이터가 아직 로드되지 않았습니다.");
        }
        
    };

    // 이미 발급된 카드인지 여부 판단
    const isDuplicateCard = () => {
        return cardInfo.some(card => card.cardTypeId === selectedCard.cardTypeId);
    };

    const handleApplyClick = () => {
        if (selectedCard && !isDuplicateCard()) { // 선택된 카드가 중복된 카드가 아니면
            setProduceCardOffer(prevState => ({
                ...prevState,
                card_type_id: selectedCard.cardTypeId // 선택된 카드 타입 
            }));
            setTimeout(() => navigate('/card2'), 300);
        } else {
            setShowModal(true); // 모달 창을 표시
        }
    };

    const handleCloseModal = () => {
        setShowModal(false); // 모달 창을 닫음
    };

    

    const getCardBenefits = (cardTypeId) => {
        switch (cardTypeId) {
            case 1:
                return [
                    t('20%Discount'),
                    t('PickUpDiscount'),
                    t('Cashback'),
                    // "환전 수수료 면제 및 특별 환율 제공"
                ];
            case 2:
                return [
                    t('10%Discount'),
                    t('FreeGuide'),
                    t('FreeInsuracne'),
                    // "관광지 티켓 사전 예약 서비스"
                ];
            case 3:
                return [
                    t('TraditionalDiscount'),
                    t('FreeLounges'),
                    t('MusicalDiscount'),
                    // "VIP 라운지 이용권 제공"
                ];
            case 4:
                return [
                    t('PlaceDiscount'),
                    t('FreeInsuracne'),
                    t('TicketDiscount'),
                    // "쇼핑 결제 금액 5% 캐시백"
                ];
            case 5:
                return [
                    t('RentDiscount'),
                    t('20%Discount'),
                    t('MontlyBenefits'),
                    // "문화 체험 프로그램 할인"
                ];
            default:
                return [
                    "기본 혜택 1",
                    "기본 혜택 2",
                    "기본 혜택 3",
                    "기본 혜택 4"
                ];
        }
    };

    return (
        <div className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
            <ProgressBar
                stages={['카드 선택', '정보 입력', '동의 사항', '카드 수령', '결제 정보']}
                currentStage={'카드 선택'}
            />

            {selectedCard && (
                <div style={{ minWidth: "90%",textAlign: 'left', fontWeight: 'bolder', margin: 'auto 110px', marginTop: '30px', fontSize: '18px' }}>
                    {translatedCardName1(selectedCard.cardName)}
                    
                </div>
            )}

            <div className='content'>
                <div className='carousel-container'>
                    {isLoading ? (
                        <div>카드 불러오는 중...</div>
                    ) : (
                        <Flickity
                            className='carousel'
                            options={flickityOptions}
                            flickityRef={(c) => {
                                if (c) {
                                    c.on('change', (index) => handleChange(index));
                                }
                            }}
                        >
                            {cards.map((card, index) => (
                                <div className="carousel-cell" key={card.cardTypeId}>
                                    <CardOverlay
                                        className='my-custom-class'
                                        img={require(`../../assets/Card${index + 1}.png`)}
                                        imgStyle={{ width: '200px', height: '335px' }}
                                        style={{ fontsize: '0px' }}
                                    />
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            ))}
                        </Flickity>
                    )}
                </div>

                {selectedCard && (
                    <div style={{
                        backgroundColor: 'white',
                        width: '300px',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        margin: '20px auto'
                    }}>
                        <div style={{
                            fontSize: '16px',
                            color: '#476EFF',
                            fontWeight: 'bold',
                        }}>
                           {selectedCard.cardUsage === '신용카드' ? t('CreditCard') : t('PrepaidCard')}
                        </div>
                        <div style={{
                            fontSize: '12px',
                            fontWeight: 'bold',
                            marginTop: '5px',
                        }}>
                            {selectedCard.annualFee} {" "+t('Won')}&nbsp;
                            <span style={{ fontSize: '11px', color: '#999' }}>{t('AnnualFee')}</span>
                        </div>

                        <ul style={{
                            listStyle: 'none',
                            padding: '0',
                            textAlign: 'left'
                        }}>
                            {getCardBenefits(selectedCard.cardTypeId).map((benefit, idx) => (
                                <li key={idx} style={{ margin: '10px 0', fontSize: '1em' }}>✓ {benefit}</li>
                            ))}
                        </ul>
                        <Button
                            style={{
                                width: '80%',
                                padding: '12px',
                                backgroundColor: isDuplicateCard() ? '#999' : '#007BFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: isDuplicateCard() ? 'not-allowed' : 'pointer',
                            }}
                            onClick={handleApplyClick}
                        >{t('Apply')}</Button>
                    </div>
                )}
            </div>
            <br />

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('ErrorApplication')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {t('AreadyBeen')}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                    {t('Confrim')}
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className='menubar'></div>
        </div>
    );
}

export default Card1;
