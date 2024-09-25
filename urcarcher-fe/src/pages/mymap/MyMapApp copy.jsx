import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Link } from 'react-router-dom';
import 'assets/Map.css';
import Modal from 'components/mymap/Modal';

const { kakao } = window;

//마커 커스텀 이미지
const myMapIcon = "/icon/markericon.png";
const locationIcon = "/icon/icon-location.png";
 
const MyMapApp = () => { 
  
  const [memberId, setMemberId] = useState('bleakwinter');  // 테스트할 회원 ID
  const [topCategoryList, setTopCategoryList] = useState([]);
  const [map, setMap] = useState(null); // 카카오 맵에 접근해 지도 상태 조작하는 상태 변수
  const [keyword, setKeyword] = useState('');  // 검색에 사용될 키워드를 관리하는 상태 변수
  const [search, setSearch] = useState([]); // 검색 결과를 담는 상태 변수
  const [pagination, setPagination] = useState(null); // 검색 결과의 페이지네이션 정보를 관리하는 상태 변수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호를 관리하는 상태 변수 (페이지네이션 기능과 연동해 어떤 페이지를 보고 있는지 나타냄)
  const [openMarkerId, setOpenMarkerId] = useState(null);  // 현재 열려있는 마커의 ID를 관리하는 상태 변수
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바의 열림/닫힘 상태를 관리하는 상태 변수
  const [isModalOpen, setIsModalOpen] = useState(false); // 모바일 환경에서 사용될 모달의 열림/닫힘 상태를 관리하는 상태 변수
  
  // const loadKakaoMapScript = () => {
  //   const script = document.createElement('script');
  //   script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_APP_KEY}&libraries=services`;
  //   script.defer = true; // 스크립트를 비동기로 로드
  //   document.head.appendChild(script);
  //   script.onload = () => {
  //     if (window.kakao && window.kakao.maps) {
  //       console.log('Kakao Maps script loaded successfully.');
  //       //setMapLoaded(true); // 스크립트 로드 완료
  //       console.log( script.src );
        
  //     } else {
  //       console.error('Failed to load Kakao Maps script.');
  //     }
  //   };
  // };

  
  //모달창 열기/닫기
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //카테고리 데이터 호출
  useEffect(() => {
    axios.get(`/api/paymentPlace/top-categories`, {
        params: {
            memberId: memberId
        }
    })
    .then(response => {
        setTopCategoryList(response.data); // 데이터를 상태에 저장
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
  }, [memberId]);

  //기본 위치 상태
  const [state, setState] = useState({
    center: { 
      lat: 37.5594538,   //학원 위치
      lng: 126.9226294 ,
    },
    errMsg: null,
    isLoading: true,
  });

  //1. 현재 사용자 위치 state에 저장하는 함수
  //현재 위치 오류로 비동기에서 동기적 방식으로 수정 (async/await사용)

   // 로컬 스토리지에서 위치를 가져오는 함수
   const loadSavedLocation = () => {
    const savedLat = localStorage.getItem('savedLat');
    const savedLng = localStorage.getItem('savedLng');

    if (savedLat && savedLng) {
      return {
        lat: parseFloat(savedLat), //실수로 변환
        lng: parseFloat(savedLng),
      };
    }

    return null;
  };

  // 현재 위치를 받아와 상태를 업데이트하고 로컬 스토리지에 저장하는 함수
  const updateCurrentLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        });

        console.log('현재 위치:', position.coords.latitude, position.coords.longitude);

        const newCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // 상태 업데이트
        setState({
          center: newCenter,
          errMsg: null,
          isLoading: false,
        });

        // 로컬 스토리지에 위치 저장
        localStorage.setItem('savedLat', newCenter.lat);
        localStorage.setItem('savedLng', newCenter.lng);

      } catch (err) {
        console.error('위치 정보를 가져오는 데 실패했습니다.', err);
        setState((prev) => ({
          ...prev,
          errMsg: err.message,
          isLoading: false,
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할 수 없어요.',
        isLoading: false,
      }));
    }
  };

  // 컴포넌트가 처음 렌더링될 때 저장된 위치로 지도 초기화
  useEffect(() => {
    const savedLocation = loadSavedLocation();

    if (savedLocation) {
      setState((prev) => ({
        ...prev,
        center: savedLocation,
        isLoading: false,
      }));
    } else {
      // 저장된 위치가 없을 경우 기본 위치 사용
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);


  //2. 주변위치 카테고리로 조회

  // 카테고리 검색으로 주변 위치 검색하기
  const searchPlaces = (keyword) => {
    console.log(keyword); //편의점,음식점 .. 등 카테고리명을 받아옴
    // Places 서비스 객체 생성
    const ps = new kakao.maps.services.Places();
    // 검색 옵션 설정
    const options = {
      location: new kakao.maps.LatLng(state.center.lat, state.center.lng), 
      radius: 5000, 
      sort: kakao.maps.services.SortBy.DISTANCE,
      //page, // 현재 페이지 번호 추가
      page: currentPage,
    };
  
    // Places 서비스의 keywordSearch 메소드 호출
    ps.keywordSearch(
      keyword,
      (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log(data);
          displayPlaces(data); // 검색된 장소를 지도에 표시하는 함수 호출 
          setPagination(pagination); // 페이지네이션 정보 업데이트 
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          setIsSidebarOpen(true); // 사이드바 열기
          setSearch(data);
        } else if (status === kakao.maps.services.Status.ERROR) {
          console.error('검색에 실패하였습니다.');
        }
      },
      options,
    );
  };

  //검색된 장소 표시
  const displayPlaces = (data) => {
    //map이 null일 때
    if (!map) return;

    const bounds = new kakao.maps.LatLngBounds();
    data.forEach((item) => bounds.extend(new kakao.maps.LatLng(item.y, item.x)));
    bounds.extend(new kakao.maps.LatLng(state.center.lat, state.center.lng));
    map.setBounds(bounds); 
    setSearch(data);
  };

 // 마커의 위치로 지도의 중심 좌표 이동하기
  const moveLatLng = (data) => {
    const newLatLng = new kakao.maps.LatLng(data.y, data.x); 
    map.panTo(newLatLng); //마커의 위치 좌표 표시
  };

  // 클릭한 마커로 중심 좌표 이동 및 검색 수행 함수
  useEffect(() => {
    if (!map) return;
    setOpenMarkerId(null);
    searchPlaces(currentPage);
  }, [map, keyword, currentPage]);

  // 마커 클릭 시 CustomOverlayMap를 열고 닫는 함수
  useEffect(() => {
    if (!map) return;
    const clickListener = (e) => {
      
      setOpenMarkerId(null);
    };
    kakao.maps.event.addListener(map, 'click', clickListener);
    
    return () => {
      kakao.maps.event.removeListener(map, 'click', clickListener);
    };
  }, [map]);
  
  
  const [activeButtonId, setActiveButtonId] = useState(0); // 처음에 첫 번째 버튼을 활성화 상태로 설정
  
  const handleButtonClick = (index, name) => {
    setActiveButtonId(index); // 클릭한 버튼의 id를 활성화 상태로 설정
    searchPlaces(name);   // 버튼 클릭 시 장소 검색
  };

  return (
    <>
      <div className='kakaomap-wrap contents'>
        
        {/* 상위 3개 카테고리 버튼 */}
        <div className='cate-btn-wrap'>
          {topCategoryList.map((item, index) => (
            <button 
              key={index} 
              type='button' 
              className={index === activeButtonId ? 'active' : ''}
              onClick={() => handleButtonClick(index, item.categoryName)}
              >
              {item.categoryName}
            </button>
          ))}
        </div>
       
        {/* 지도 컴포넌트 */}
        <Map 
          center={state.center} 
          style={{ width: '430px', height: '750px'}} 
          level={3}
          onCreate={setMap}  // 지도 객체가 생성될 때 setMap 호출, 지도 객체 업데이트
        >
          {/* 현재 위치 마커 표시 */}
          <MapMarker
            position={state.center}
            image={{
              src: myMapIcon,
              size: {
                width: 50,
                height: 50,
              },
            }}
          >
          </MapMarker>

           {/* 검색된 장소 마커 표시 */}
           {search.map((data) => (
            <React.Fragment key={data.id}>
              <MapMarker
                key={data.id}
                position={{ lat: data.y, lng: data.x }}
                image={{
                  src: locationIcon,
                  size: {
                    width: 35,
                    height: 35,
                  },
                }}
                onClick={() => {
                  if (data.id === openMarkerId) {
                    setOpenMarkerId(null);
                  } else {
                    setOpenMarkerId(data.id);
                    moveLatLng(data);
                    setIsModalOpen(true); // 마커 클릭 시 모달 열기
                  }
                }}
              />
              {/* 해당 마커에 커스텀 오버레이 표시 */}
             
            </React.Fragment>
          ))}
          {/* 모달 표시 */}
          {isModalOpen && (
            <Modal
              search={search}
              openMarkerId={openMarkerId}
              setOpenMarkerId={setOpenMarkerId}
              isModalOpen={isModalOpen}
              moveLatLng={moveLatLng}
              pagination={pagination}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              closeModal = {closeModal}
            />
          )} 
          <div className='storeRank-link'>
              <Link to="/maphome/beststorelist">
                <img src="/icon/icon-list.png" alt="아이콘" />
              </Link>
          </div>
          {/* 내 위치 찾기 */}
          <div className='current-location-btn'>
            <button onClick={updateCurrentLocation}>
              <img src='/icon/icon-my-location.png' alt='내위치'></img>
            </button>
          </div>
        </Map>
      </div>
    </>
  );
};

export default MyMapApp;