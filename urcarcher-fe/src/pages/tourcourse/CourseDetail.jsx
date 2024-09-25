import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/Modal.css';
import '../../assets/CourseDetail.css';
import { useLocation } from 'react-router-dom';
import arrow from '../../assets/arrow.png';
import spot_arrow from '../../assets/spot_arrow.png';
import { options_POST } from 'services/CommonService';
import RegionImgUrl from 'assets/icon_cos_schedule.gif';
import tagImgUrl from 'assets/ico_schedule_tag.png';


const CourseDetail = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [courseName, setCourseName] = useState(location.state?.courseName || '');
  const [region, setRegion] = useState(location.state?.courseRegion || '');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [completedItems, setCompletedItems] = useState(new Set());
  const [verificationImage, setVerificationImage] = useState('');
  

  useEffect(() => {
    if(courseName === '') {
      nav("/CourseList");
      return;
    } 
    
    axios.get(`/api/course/${courseId}`)
      .then((response) => {

        const { places, certifications } = response.data;
        const certificationsSafe = certifications || [];
        const courseData = places.map(item => ({
        ...item,
        latitude: parseFloat(item.latitude).toFixed(6),
        longitude: parseFloat(item.longitude).toFixed(6)
        }));
        console.log('Course data:', courseData);
        console.log('Certifications:', certifications);
        setCourse(courseData);
        setCertifications(certificationsSafe);
        setLoading(false);
        console.log("지역:", region)
        const completedSet = new Set();
        certificationsSafe.forEach(cert => {
          completedSet.add(cert.placeId);
        });
        setCompletedItems(completedSet);

        setLoading(false);
  
        // 카카오맵 스크립트 로드 및 기본 지도 표시
        const script = document.createElement('script');
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_APP_KEY}&libraries=services`;
        document.head.appendChild(script);
  
        script.onload = () => {
          const firstPlace = courseData[0]; // 첫 번째 장소를 사용하여 초기 중심 위치 설정
          const mapContainer = document.getElementById('mainMap'); // 기본 지도를 표시할 div
  
          const geocoder = new window.kakao.maps.services.Geocoder();
  
          // 첫 번째 주소를 사용해 좌표를 가져와서 지도 중심으로 설정
          geocoder.addressSearch(firstPlace.address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
  
              const mapOption = {
                center: coords, // 첫 번째 장소의 좌표로 지도 중심 설정
                level: 7 // 지도 확대 레벨
              };
  
              const map = new window.kakao.maps.Map(mapContainer, mapOption);
  
              // 모든 주소에 대해 마커 및 커스텀 오버레이 추가
              courseData.forEach(item => {
                const markerPosition = new window.kakao.maps.LatLng(item.latitude, item.longitude);
  
                // 마커 생성
                const marker = new window.kakao.maps.Marker({
                  map: map,
                  position: markerPosition
                });
  
                // 커스텀 오버레이에 표시될 내용 (장소명)
                
                const content = `<div class="customoverlay">
                                <div class="balloon">
                                  <div class="balloon-text-container">
                                    <div class="balloon-text">${item.placeName}</div>
                                  </div>
                                  <div class="balloon-arrow-container">
                                    <img src="${arrow}" class="balloon-arrow" alt="arrow">
                                  </div>
                                  <div class="balloon-tail"></div>
                                </div>
                              </div>`;

                // 커스텀 오버레이 생성
                const customOverlay = new window.kakao.maps.CustomOverlay({
                  position: markerPosition,
                  content: content,
                  yAnchor: 2.4, // 오버레이가 마커와 겹치지 않도록 Y축 기준점 설정
                  zIndex: 1 // 오버레이가 마커보다 위에 표시되도록 설정
                });
  
                customOverlay.setMap(map);
  
                // 마커에 클릭 이벤트 추가 (선택 사항)
                window.kakao.maps.event.addListener(marker, 'click', function() {
                  alert(`${item.placeName}\n${item.address}`);
                });
              });
            }
          });
        };
  
        return () => {
          // 컴포넌트 언마운트 시 스크립트 제거
          document.head.removeChild(script);
        };
  
      })
      .catch((error) => {
        console.error('Error fetching course:', error);
        setLoading(false);
      });
  }, [location, courseName, courseId]);
  
  

  const getGeolocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            resolve({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error('Error getting geolocation:', error);
            reject(error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  const loadKakaoMapScript = () => {
    if (document.getElementById('kakao-map-script')) {
      initializeMap('verificationMap');
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_APP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap('verificationMap');
      });
    };
  };

  const initializeMap = (mapId) => {
    if (latitude && longitude) {
      const mapContainer = document.getElementById(mapId);
      if (!mapContainer) {
        console.error('mapContainer가 존재하지 않습니다.');
        return;
      }

      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      });

      marker.setMap(map);
     
    }
  };

  const handleButtonClick = async (targetLocation) => {
    try {
      const location = await getGeolocation();
         compareLocation(location.lat, location.lng, targetLocation.latitude, targetLocation.longitude, targetLocation.placeName,targetLocation.placeId);
    } catch (error) {
      console.error('Geolocation을 가져오는 데 실패했습니다.', error);
    }
  };

  useEffect(() => {
    if (mapModalOpen && latitude && longitude) {
      setTimeout(() => {
        loadKakaoMapScript();
      }, 100);
    }
  }, [mapModalOpen, latitude, longitude]);

  const closeMapModal = () => {
    setMapModalOpen(false);
  };

  const closeVerificationModal = () => {
    setVerificationModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const toRadians = (degree) => {
    return degree * (Math.PI / 180);
  } 

  const compareLocation = (currentLat, currentLng, targetLat, targetLng,placeName ,placeId) => {
    const R = 6371e3; // 지구의 반지름 (미터 단위)
    
    // 현재 위치와 목표 위치를 라디안으로 변환
    const currentLatRad = toRadians(currentLat);
    const targetLatRad = toRadians(targetLat);
    console.log(currentLat ,currentLng );
    // 위도와 경도의 차이 계산
    const deltaLat = toRadians(targetLat - currentLat);
    const deltaLng = toRadians(targetLng - currentLng);
    
    // Haversine 공식에 따른 거리 계산
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(currentLatRad) * Math.cos(targetLatRad) *
              Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    const distance = R * c; // 두 좌표 간의 거리 (미터 단위)
  
   
    if (distance <= 2000) {  // 1km 반경 내에 있는지 확인
        
        axios(options_POST("/api/course/certification", {
          placeId: placeId,
          courseId: courseId,
        }))
        .then((resp)=>{
          console.log(resp.data);
        })
        .catch((err)=>{
          console.log(err);
        })

        setCompletedItems((prev) => {
          const updatedSet = new Set(prev).add(placeId);
    
          // 전체 코스의 장소 수와 인증된 장소 수를 비교
          if (updatedSet.size === course.length) {
            // 모든 장소가 인증된 경우 (코스 완료)
            setModalMessage(`[${courseName}] \n해당 코스의 모든 인증이 완료되었습니다.`);
            setVerificationImage(require('../../assets/Heart2.png')); // 새로운 이미지로 변경
          } else {
            // 특정 장소 인증만 완료된 경우
            setModalMessage(`[${placeName}] \n 인증이 완료되었습니다.`);
        
            setVerificationImage(require('../../assets/success.png'));
          }
    
          return updatedSet;
        }); 

        // setModalMessage(`[${placeName}] \n 인증이 완료되었습니다.`);
        // setVerificationImage(require('../../assets/success.png'));
        // setCompletedItems((prev) => new Set(prev).add(placeId));
      
    } else {
        
        setModalMessage('인증에 실패했습니다.\n다시 시도해주십시오.');
        setVerificationImage(require('../../assets/failure.png'));
    }

    // 지도 모달 먼저 열고, 그 위에 인증 결과 모달을 오픈
    setMapModalOpen(true);
    setTimeout(() => {
      setVerificationModalOpen(true);
    }, 200);
  };

  // 마지막 아이템의 이미지 URL 가져오기
  const lastItem = course[course.length - 1];
  const bgImgUrl = lastItem ? lastItem.placeImg : '';

    return (
      <div className="course-detail">
        <div className='course-background' style={{width:'100%'}}>
          <div className="detail-course-name" style={{ backgroundImage: `url(${bgImgUrl})`}}>
            {/* 코스명 표시 */}
            <p className='course-name-title'>
              <span className='corse-number'>{course.length}코스</span>
              <span className='course-title'>{courseName}</span>
            </p>
            <div className='course-tag-wrap'>
                <div>
                  <img src={RegionImgUrl} alt="태그" style={{width:'30px', height:'30px', borderRadius:'50%'}} />
                  <div className='course-tag-textwrap'  style={{textAlign:'left'}}>
                    <p>지역</p>
                    <p>{region}</p>
                  </div>
                </div>
                <div>
                  <img src={tagImgUrl} alt="태그" style={{width:'30px', height:'30px', borderRadius:'50%'}} />
                  <div className='course-tag-textwrap'  style={{textAlign:'left'}}>
                    <p>태그</p>
                    <p>#추천코스 #{region}가볼만한곳 #관광지</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className="course-items-container">
        {Array(Math.ceil(course.length / 4)).fill().map((_, rowIndex) => (
          <div key={rowIndex} className="row-container">
            {course.slice(rowIndex * 4, (rowIndex + 1) * 4).map((item) => (
              <div key={item.placeId} className="course-item">
                <img
                  src={completedItems.has(item.placeId) ? require('../../assets/checked.png') : require('../../assets/default.png')}
                  alt="marker"
                  className="marker-image"
                  onClick={() => handleButtonClick(item)}
                />
                <h2>{item.placeName}</h2>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="place-containers">
        {course.map((item) => (
          <div key={item.placeId} className="all-place-container">
            <div className="place-container">
            <img src={item.placeImg} alt={`${item.placeName} 이미지`} className="place-image" />
            <div className="place-details">
              <h2 className="place-name">🚩 {item.placeName}</h2>
              <p className="place-address">{item.address}</p>
              <p className="place-content">{item.content}</p>
            </div>

           
            </div>
            <p className="place-detail-content">{item.detailContent}</p>
          </div>
        ))}
      </div>

      {/* 첫 번째 지도 */}
      <div id="mainMap"></div>

      {/* 모달에 들어가는 두 번째 지도 */}
      {mapModalOpen && (
        <div className="modal map-modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <span className="close" onClick={closeMapModal}>&times;</span>
            <h2>현재 위치</h2>
            <div id="verificationMap" style={{ width: '100%', height: '400px' }}></div> {/* 두 번째 지도용 id */}
          </div>
        </div>
      )}
  
      {verificationModalOpen && (
        <div className="modal verification-modal" style={{ display: 'flex', zIndex: 1100 }}>
          <div className="modal-content">
            <span className="close" onClick={closeVerificationModal}>&times;</span>
            <img className="modal-img" src={verificationImage}  alt="Verification Status" style={{ width: '100px', height: '100px' }} /> {/* 이미지 추가 */}
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
      </div>
    );
  };

export default CourseDetail;
