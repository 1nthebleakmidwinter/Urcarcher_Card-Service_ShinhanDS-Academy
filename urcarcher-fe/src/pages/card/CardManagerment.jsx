/* eslint-disable default-case */
import styled from 'styled-components';
import Flickity from 'react-flickity-component';
import React, { useEffect, useState } from 'react';
import CardOverlay from 'bootstrap-template/components/cards/CardOverlay';
import { ListGroup, Modal, Button } from 'react-bootstrap';
import ChargePayment from './ChargePayment';
import SettingPassword from './SettingPassword';
import CancelCard from './CancelCard';
import PaymentSummary from './PaymentSummary';
import Axios from 'axios';
import myImage from 'assets/question.jpg';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';
import { Link, useNavigate } from 'react-router-dom';



function CardManagerment(props) {

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


    const [myCard, setMyCard] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState('');
    const [userId, setUserId] = useState(null);
    const [nationality, setNationality] = useState(null);
    const navigate = useNavigate();

    const flickityOptions = {
        cellAlign: 'center',
        pageDots: false,
        groupCells: '20%',
        selectedAttraction: 0.03,
        friction: 0.15,
        contain: false,
        initialIndex: 0 // 첫 번째 카드가 중앙에 오도록 설정
    };

    const handleToggleChange = (event, cardId) => {

      console.log(`Toggle change for cardId: ${cardId}`);
      console.log(`Event target checked: ${event.target.checked}`);

      const updatedCards = myCard.map(card => {
        if (card.cardId === cardId) {
            return { ...card, cardStatus: event.target.checked };
        }
        return card;
      });
      setMyCard(updatedCards);

        Axios.post('/api/card/cardstatus', {
            cardId: String(cardId),
            isActive: String(event.target.checked)
        }).then(response => {
            console.log('카드 상태가 업데이트되었습니다.');
        }).catch(error => {
            console.error('카드 상태 업데이트에 실패했습니다.');
        });
    };

    const handleOptionClick = (content, card) => {
        switch (content) {
            case "1":
                setModalContent(<PaymentSummary setShowModal={setShowModal} card={card} />);
                setModalTitle(t('EstimatedAmount'));
                break;
            case "2":
              Axios.get("api/t/test")
                .then((response)=>{
                  if(nationality !== "KR"){
                    navigate("/exchange");
                  }else{
                    setModalContent(<ChargePayment setShowModal={setShowModal} card={card} onPaymentSuccess={handlePaymentSuccess} />);
                    setModalTitle(t('LoadAmount'));
                  }
                })
                break;
            case "3":
                setModalContent(<SettingPassword setShowModal={setShowModal} card={card} />);
                setModalTitle(t('SetPINNumber'));
                break;
            case "5":
                setModalContent(<CancelCard setShowModal={setShowModal} card={card} />);
                setModalTitle(t('CancelCard'));
                break;
            default:
                console.log("올바른 선택지가 아닙니다");
        }
        setShowModal(true);
    };
    const handlePaymentSuccess = (cardId, updatedBalance) => {
      const updatedCards = myCard.map(card => {
          if (card.cardId === cardId) {
              return { ...card, cardBalance: updatedBalance };
          }
          return card;
      });
      setMyCard(updatedCards); // 상태 업데이트
  };

  

  useEffect(() => {

    const savedLanguage = Cookies.get('selectedLanguage');
    if (savedLanguage) {
        changeLanguage(savedLanguage); // 언어 변경
    } else {
        changeLanguage('Korea'); // 기본 언어 설정
    }

        Axios.get("/api/t/test")
            .then((response) => {
                setUserId(response.data.memberId);
                setNationality(response.data.nationality);

            })
            .catch((error) => {
                //alert("회원정보를 가져오는데 오류 발생");
                console.log(error);
            });

      if (userId) {
          Axios.get(`/api/card/mycard/${userId}`)
              .then((response) => {
                  setMyCard(response.data);
                  const cards = response.data.map(card => ({
                    ...card,
                    cardStatus: card.cardStatus
                }));
                setMyCard(cards);
                console.log(cards)
              })
              .catch((error) => {
                  console.log("card정보 가져오는데 오류 발생");
                  console.log(error);
              });
      }
  }, [userId]);

    return (
        <>
            <CardDetailsContainer>
                <br /><br /><br /><br /><br />
                <CardSection>
                    <button className="arrow-button arrow-left">
                        ‹
                    </button>
                    <FlickityStyled
                        options={flickityOptions}
                        flickityRef={(c) => {
                            if (c) {
                                console.log(c);
                            }
                        }}
                    >
                        {myCard.map((card, index) => (
                            <CarouselCell key={card.cardId}> 
                                <CardOverlay
                                    className='my-custom-class'
                                    img={require(`../../assets/Card${card.cardTypeId}_.png`)}
                                    imgStyle={{ width: '335px', height: '200px',  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
                                />
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                  <p style={{fontWeight:'bold', color:'darkgrey', textAlign:'left', fontSize:'15px',marginTop:'5px' , marginBottom:'5px'}}>
                                    {(card.cardTypeId === 1 || card.cardTypeId === 2) ? t('CreditCard'):t('PrepaidCard')}
                                  </p>
                                  <p style={{fontWeight:'bold', color:'darkgrey', textAlign:'left', fontSize:'10px',marginTop:'5px' , marginBottom:'5px'}}>
                                    {(card.cardTypeId === 1 || card.cardTypeId === 2) ? "" : t('Balance') +" | " + parseFloat(card.cardBalance).toLocaleString()+t('Won')}
                                  </p>
                                </div>

                                <ListGroup variant="flush" className="options-section">
                                    <OptionItem>
                                        <span className="option-text" style={{ color: '#064AFF' }}><strong>{t('CardNumber')}</strong></span>
                                        <MaskedCardInfo>{card.cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')}</MaskedCardInfo>
                                    </OptionItem>
                                    <OptionItem
                                        onClick={() => (card.cardTypeId === 1 || card.cardTypeId === 2) && handleOptionClick("1", card)}
                                        style={{
                                            cursor: (card.cardTypeId === 1 || card.cardTypeId === 2) ? 'pointer' : 'not-allowed',
                                            color: (card.cardTypeId === 1 || card.cardTypeId === 2) ? '#333' : '#ccc'
                                        }}
                                    >
                                        {t('EstimatedAmount')}
                                    </OptionItem>
                                    <OptionItem onClick={() => card.cardTypeId !== 1 && card.cardTypeId !== 2 && handleOptionClick("2", card)}
                                    style={{
                                        cursor: card.cardTypeId !== 1 && card.cardTypeId !== 2 ? 'pointer' : 'not-allowed',
                                        color: card.cardTypeId !== 1 && card.cardTypeId !== 2 ? '#333' : '#ccc'
                                    }}>
                                        {t('LoadAmount')}
                                    </OptionItem>
                                    <OptionItem onClick={() => handleOptionClick("3", card)}>
                                    {t('SetPINNumber')}
                                    </OptionItem>
                                    <OptionItem>
                                        <span>{t('ActivateCard')}</span>
                                  
                                        <ToggleSwitch>
                                            <input
                                                type="checkbox"
                                                id={`toggle-switch-${card.cardId}`}  // 고유한 id 추가 - 이거 안하면 토글 버튼이 카드 고유 상태를 관리 못함
                                                checked={card.cardStatus}
                                                onChange={(event)=>handleToggleChange(event, card.cardId)}
                                            />
                                            <label htmlFor={`toggle-switch-${card.cardId}`}></label>
                                        </ToggleSwitch>
                                    </OptionItem>
                                    <OptionItem onClick={() => handleOptionClick("5", card)}>
                                    {t('CancelCard')}
                                    </OptionItem>
                                </ListGroup>
                            </CarouselCell>
                        ))}
                    </FlickityStyled>
                    <button className="arrow-button arrow-right">
                        ›
                    </button>
                </CardSection>
                <hr/>
                <Link to="/faq" style={{ textDecoration: 'none' }}>
                  <CardOverlay
                    className="my-custom-class" 
                    img={myImage}
                    // imgStyle={{ height: '110px', width: '390px', objectFit: 'cover', backgroundColor:'#f3f6fb', margin:'-10px -15px' }} //기존
                    imgStyle={{ height: '110px', width: '100%', objectFit: 'cover', backgroundColor:'#f3f6fb', margin:'0 auto' }}
                  />
                  </Link>
                <br /><br /><br /><br /><br /><br />
            </CardDetailsContainer>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalContent}
                </Modal.Body>
                <Modal.Footer>
                <ModalCloseButton onClick={() => setShowModal(false)}>
                {t('Close')}
                </ModalCloseButton>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const CardDetailsContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: auto;
  padding: 25px;
  background-color: #F9FBFC;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const CardSection = styled.div`
  position: relative;
  text-align: center;
`;

const CarouselCell = styled.div`
  margin: 0 32px;
`;

const FlickityStyled = styled(Flickity)`
  .flickity-slider .is-pointer-down,
  .flickity-slider .flickity-prev-next-button:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }

  .flickity-button {
    display: none;
  }
`;

const OptionItem = styled(ListGroup.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  font-size: 16px;
  color: #333;
  background-color: #FFF;
  border-bottom: 1px solid #E6E9ED;
  cursor: pointer;

  &:first-child {
    border-radius: 12px 12px 0 0;
  }

  &:last-child {
    border-radius: 0 0 12px 12px;
    border-bottom: none;
  }

  &:hover {
    background-color: #F1F3F5;
  }
`;

const MaskedCardInfo = styled.span`
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  margin-right:20px;
  color: #555;
`;

const ToggleSwitch = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;

  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & label {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #bbb;
    transition: .4s;
    border-radius: 34px;
  }

  & input:checked + label {
    background-color: #4CAF50;
  }

  & label:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  & input:checked + label:before {
    transform: translateX(18px);
  }
`;
const ModalCloseButton = styled(Button)`
  background-color: #6c757d !important;
  border-color: #6c757d !important;
  width:150px !important;
  &:hover {
    background-color: #5a6268 !important;
    border-color: #545b62 !important;
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(130, 138, 145, 0.5);
  }
`;

export default CardManagerment;
