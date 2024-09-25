import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardOverlay from '../../bootstrap-template/components/cards/CardOverlay';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import leftArrow from "assets/left-arrow.png";
import rightArrow from "assets/right-arrow.png";
import logo from "assets/logo.png";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import './performanceDetail.css';



function PerformanceDetail() {

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


  const { id } = useParams(); // mt20id를 URL 파라미터로 받음
  const [detailData, setDetailData] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 이미지 인덱스 상태 추가
  const [seatingData, setSeatingData] = useState([]); // 좌석 데이터 상태 추가
  const navigate = useNavigate();
    

  useEffect(() => {

    const savedLanguage = Cookies.get('selectedLanguage');
    if (savedLanguage) {
        changeLanguage(savedLanguage); // 언어 변경
    } else {
        changeLanguage('Korea'); // 기본 언어 설정
    }


    const fetchDetailData = async () => {
      try {
        const response = await axios.get('/api/reservation/reservation-detail', {
          params: {
            mt20id: id,
            newsql: 'Y',
          }
        });
        
        console.log(response.data); // 응답 데이터 확인용 콘솔 로그
        setDetailData(response.data);

        // item.db의 pcseguidance 데이터를 파싱하여 seatingData로 설정
        const item = response.data?.db;
        if (item) {
          setSeatingData(parseSeatingData(item.pcseguidance || ""));
        }

      } catch (err) {
        setError(err.message);
      }
    };

    fetchDetailData();
  }, [id]);

  // 좌석 데이터 파싱 함수
  const parseSeatingData = (data) => {
    if (!data) return []; // null 또는 undefined일 경우 빈 배열 반환
    
    const cleanedData = data.replace(/\s/g, '').replace(/,/g, '');
    
    return cleanedData.split(t('Won')).filter(Boolean).map((seat) => {
      const seatTypeMatch = seat.match(/(.+석)/);
      const priceMatch = seat.match(/(\d+)/);

      if (seatTypeMatch && priceMatch) {
        const seatType = seatTypeMatch[1];
        const priceString = priceMatch[1];

        return { type: seatType, price: parseInt(priceString, 10) };
      } else {
        return { type: "알 수 없는 좌석", price: 0 };
      }
    });
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!detailData) {
    return <div>Loading...</div>;
  }

  // 응답 데이터 구조에 맞게 수정
  const item = detailData && detailData.db; // db 프로퍼티 안의 데이터 사용

  if (!item) {
    return <div>No detail available</div>;
  }
  
  // item.poster를 첫 번째 이미지로 추가하고, 이후 styurl 배열의 이미지들을 추가
  console.log(typeof(item.styurls.styurl))
  if(typeof(item.styurls.styurl)!='string'){
    console.log(item.styurls.styurl.length, item.styurls.styurl) }
    else
     console.log("1개", item.styurls.styurl)

  const images = item.poster 
  ? [item.poster, ...(typeof(item.styurls.styurl)!='string')?item.styurls.styurl : [  item.styurls.styurl]] 
  : [logo, ...(item.styurls?.styurl || [])];
 console.log(images);

 // http: -> https: 변환
const secureImages = images.map((url) => {
  return url.startsWith('http:') ? url.replace('http:', 'https:') : url;
});

  // 이전 이미지로 이동
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? secureImages.length - 1 : prevIndex - 1));
  };

  // 다음 이미지로 이동
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === secureImages.length - 1 ? 0 : prevIndex + 1));
  };
  
  const getTranslatedState = (state) => {
    switch (state) {
      case '공연중':
        return t('performance.inProgress');
      case '공연예정':
        return t('performance.upcoming');
      case '공연완료':
        return t('performance.completed');
      default:
        return state; // 번역이 없을 경우 원래 상태를 반환
    }
  };


  return (
    <div className='contents'>
        <div className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
          <div style={{ position: 'relative' }}>
            {secureImages.length > 1 &&  (
              <img
                src={leftArrow} // 좌측 화살표
                alt="Previous"
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  cursor: 'pointer',
                  width: '30px', height: '30px',
                  filter: 'invert(100%) sepia(100%) saturate(0%) brightness(200%) contrast(1000%)', // 흰색으로 만듦
                  opacity: '0.6'
                }}
                onClick={handlePreviousImage}
              />
            )}
            <CardOverlay
              className="my-custom-class"
              img={secureImages[currentImageIndex]} // 현재 이미지 인덱스에 해당하는 이미지 사용
              style={{
                padding: "10px",
                margin: "0",
                width: "100%",
                borderRadius: "0 0 10px 10px",
              }}
            />
            {secureImages.length > 1 && (
              <img
                src={rightArrow} // 우측 화살표
                alt="Next"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  cursor: 'pointer',
                  width: '30px', height: '30px',
                  filter: 'invert(100%) sepia(100%) saturate(0%) brightness(200%) contrast(1000%)', // 흰색으로 만듦
                  opacity: '0.6'
                }}
                onClick={handleNextImage}
              />
            )}
          </div>
          <br />
          <h1 className="display-6">{item.prfnm}</h1> {/* 공연명 */}
          <p style={{ textAlign: 'left', margin: '10px' }}># {t('Information')}</p>
          <p style={{ textAlign: 'left', margin: '10px' }}>
        {getTranslatedState(item.prfstate)}
      </p>
          <hr />
          <div className='perform_detail_wrapper'>
              {item.fcltynm && item.fcltynm.trim() !== "" && ( <p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>{t('location')}: {item.fcltynm}</p> )} {/* 공연 장소 */}
              {item.prfpdfrom  && item.prfpdfrom.trim() !== ""&& (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>{t('duration')}: {item.prfpdfrom} ~ {item.prfpdto}</p> )} {/* 공연 기간 */}
              {item.dtguidance  && item.dtguidance.trim() !== ""&& (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>{t('time')}: {item.dtguidance}</p> )}
              {item.prfruntime && item.prfruntime.trim() !== "" && (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>{t('runtime')}: {item.prfruntime}</p> )}
              {item.prfage  && item.prfage.trim() !== ""&& (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>{t('age')}: {item.prfage} </p>)}
              {item.prfcast && item.prfcast.trim() !== "" && (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>{t('cast')}: {item.prfcast}</p> )}
              {item.prfcrew  && item.prfcrew.trim() !== ""&& (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>{t('staff')}: {item.prfcrew} </p> )}
              {item.entrpsnm  && item.entrpsnm.trim() !== ""&& (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>{t('producer')}: {item.entrpsnm}</p> )}
              {item.entrpsnmP && item.entrpsnmP.trim() !== "" && (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>{t('production_company')}: {item.entrpsnmP} </p> )}
              {item.entrpsnmA && item.entrpsnmA.trim() !== "" && (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>{t('planning_company')}: {item.entrpsnmA}</p> )}
              {item.pcseguidance && item.pcseguidance.trim() !== "" && (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>{t('ticket_price')}: {item.pcseguidance}</p>)}
              {item.sty && item.sty.trim() !== "" && (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>{t('synopsis')}: {item.sty}</p> )}
            <div className='perform_detail_btn_box' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div className='perform_detail_btn1'>
                <button
                  // style={{ width: '110px' }}
                  onClick={() => {
                    navigate(`/MapComponent/${item.fcltynm}`);
                  }}
                  >
                  {t('FindRoute')}
                </button>
                <button
                  // style={{ width: '110px' }}
                  onClick={() => {
                    //navigate(`/reserve`, { state: { title: item.prfnm, location: item.fcltynm, img: item.poster || logo } });
                    navigate(`/reserve`, { state: { title: item.prfnm, location: item.fcltynm, img: item.poster || logo, seatingData: seatingData, resTime:item.dtguidance, resStart:item.prfpdfrom, resEnd:item.prfpdto  } });
                  }}
                  disabled={item.prfstate === "공연완료"}
                  >
                  {t('BookingAndPayment')}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
  );
}

export default PerformanceDetail;