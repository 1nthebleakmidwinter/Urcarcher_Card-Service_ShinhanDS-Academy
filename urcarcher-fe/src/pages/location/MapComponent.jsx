import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import LocationIcon from '../../assets/nowlocation.png'; // 이미지 경로 가져오기
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import LoadingSpinner from 'components/LoadingSpinner'; // 스피너가 있는지 확인하세요.
import SelectLanguage from 'components/language/SelectLanguage';

const MapComponent = (props) => {

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

  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY_1;
  const { detailDestination } = useParams();
  
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState(detailDestination || '');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [loading, setLoading] = useState(false);  // 로딩 상태를 추가합니다.

  const travelMode = 'TRANSIT';

  // 위치 정보를 가져오는 함수
  const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        setLoading(true);  // 위치 정보를 가져오는 동안 로딩을 표시합니다.
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const geocoder = new window.google.maps.Geocoder();
            const latLng = new window.google.maps.LatLng(latitude, longitude);

            geocoder.geocode({ location: latLng }, (results, status) => {
              setLoading(false);  // 위치 정보를 가져온 후 로딩을 종료합니다.
              if (status === 'OK') {
                setOrigin(results[0].formatted_address);
                resolve(results[0].formatted_address);
              } else {
                console.error('Geocoder failed due to: ' + status);
                reject(status);
              }
            });
          },
          (error) => {
            setLoading(false);  // 오류 발생 시 로딩을 종료합니다.
            console.error('Error Code = ' + error.code + ' - ' + error.message);
            if (error.code === error.PERMISSION_DENIED) {
              alert(t('LocationPermissionRequired'));
            }
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        reject("Geolocation not supported");
      }
    });
  };

  // 위치 정보를 가져오는 것을 지연시키고 실패 시 재시도하는 함수
  const retryGetLocation = async (attempts = 3, delay = 1000) => {
    for (let i = 0; i < attempts; i++) {
      try {
        await new Promise(res => setTimeout(res, delay));  // 지연시킴
        await getCurrentLocation();
        handleLoad();
        return; // 성공하면 종료
      } catch (error) {
        console.warn(`위치 가져오기 시도 실패: ${i + 1} / ${attempts}`);
      }
    }
    console.error("모든 위치 가져오기 시도가 실패했습니다.");
  };

  const onLoadScriptHandler  = async () => {
    try {
      await retryGetLocation();  // 위치 요청을 지연시키고 재시도
    } catch (error) {
      console.error("초기 위치를 가져오는데 실패했습니다: ", error);
    }
  };

  const handleLoad = useCallback(() => {
    const autocompleteStart = new window.google.maps.places.Autocomplete(
      document.getElementById('start'),
      { types: ['geocode'] }
    );
    const autocompleteEnd = new window.google.maps.places.Autocomplete(
      document.getElementById('end'),
      { types: ['geocode'] }
    );

    autocompleteStart.addListener('place_changed', () => {
      const place = autocompleteStart.getPlace();
      if (place && place.geometry) {
        setOrigin(place.formatted_address);
      }
    });

    autocompleteEnd.addListener('place_changed', () => {
      const place = autocompleteEnd.getPlace();
      if (place && place.geometry) {
        setDestination(place.formatted_address);
      }
    });
  }, []);

  const getCoordinates = (address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    });
  };

  const handleDirectionResponse = (response) => {
    if (response.status === 'OK') {
      const uniqueRoutes = response.routes.filter((route, index, self) =>
        index === self.findIndex((r) => (
          r.summary === route.summary && r.legs[0].distance.text === route.legs[0].distance.text
        ))
      );
      const limitedRoutes = uniqueRoutes.slice(0, 3);
      setDirectionsResponse(response);
      setRoutes(limitedRoutes);

    } else {
      console.error('Directions request failed due to', response.status);
      console.error('Error details:', response);
    }
  };

  const handleSubmit = async () => {
    try {
      if (origin && destination) {
        const originCoordinates = await getCoordinates(origin);
        const destinationCoordinates = await getCoordinates(destination);

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: originCoordinates,
            destination: destinationCoordinates,
            travelMode: window.google.maps.TravelMode[travelMode],
            provideRouteAlternatives: true,
          },
          (response) => {
            handleDirectionResponse(response)
           // 첫 번째 경로를 자동으로 선택
           if (response.routes && response.routes.length > 0) {
            setSelectedRoute(response.routes[0]);
          }
          }
        );
      } else {
        console.error('Please provide both origin and destination.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    const savedLanguage = Cookies.get('selectedLanguage');
    if (savedLanguage) {
        changeLanguage(savedLanguage); // 언어 변경
    } else {
        changeLanguage('Korea'); // 기본 언어 설정
    }
  },[]);

  return (
    <Container>
      <br/>
      <br/>
      <br/>
      <br/>
      <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={['places']} onLoad={onLoadScriptHandler}>
        <div>
          <InputContainer>
            <Autocomplete>
              <Input
                id="start"
                type="text"
                placeholder={t('Departure')}
                value={origin || ''}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </Autocomplete>
            <LocationButton onClick={async () => { await getCurrentLocation(); }}>
              <LocationImage src={LocationIcon} alt="현재 위치 설정" />
            </LocationButton>
          </InputContainer>
          <InputContainer>
            <Autocomplete>
              <Input
                id="end"
                type="text"
                placeholder={t('Destination')}
                value={destination || ''}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Autocomplete>
          </InputContainer>
          <StyledButton onClick={handleSubmit}>
            {t('FindRoute')}
          </StyledButton>
        </div>

        {loading && (
          <LoadingOverlay>
            <LoadingSpinner />
          </LoadingOverlay>
        )}

        <div className="scrollable-content" style={{ maxHeight: '600px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
          <MapContainer>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={13}
              onLoad={handleLoad}
            >
              {selectedRoute && <DirectionsRenderer directions={{ ...directionsResponse, routes: [selectedRoute] }} />}
            </GoogleMap>
          </MapContainer>
          <div style={{ marginTop: '20px' }}>
            {routes.map((route, index) => (
              <RouteCard key={index}>
                <h3 style={{ marginBottom: '10px' }}>{t('Route')} {index + 1}</h3>
                <Button
                  style={{ marginBottom: "12px" }}
                  onClick={() => setSelectedRoute(route)}
                >
                  {t('ViewThisRoute')}
                </Button>
                {route.legs.map((leg, legIndex) => (
                  <div key={legIndex}>
                    <p><strong>{t('Departure')}:</strong> {leg.start_address}</p>
                    <p><strong>{t('Destination')}:</strong> {leg.end_address}</p>
                    <p><strong>{t('Distance')}:</strong> {leg.distance.text}</p>
                    <p><strong>{t('EstimatedTime')}:</strong> {leg.duration.text}</p>
                    {leg.steps.map((step, stepIndex) => (
                      <div key={stepIndex} style={{ marginBottom: '10px', paddingLeft: '10px', borderLeft: '2px solid #4CAF50' }}>
                        <p dangerouslySetInnerHTML={{ __html: step.instructions }} style={{ margin: '5px 0' }}></p>
                        <p style={{ margin: '5px 0' }}><strong>{t('Distance')}:</strong> {step.distance.text}</p>
                        <p style={{ margin: '5px 0' }}><strong>{t('EstimatedTime')}:</strong> {step.duration.text}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </RouteCard>
            ))}
          </div>
        </div>
      </LoadScript>
    </Container>
  );
};

const Container = styled.div`
  max-height: 800px;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  position: relative;
`;

const MapContainer = styled.div`
  margin-top: 20px;
  padding: 0;
  margin: 0;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  width:350px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 5px; /* 이미지를 오른쪽에 위치시키기 위해 여백 추가 */
  margin-left: 25px;
`;

const StyledButton = styled.button`
  padding: 10px 30px;
  background-color: #476EFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 10px auto;
  width: 50%;

  &:hover {
    opacity: 0.9;
  }
`;

const RouteCard = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const LocationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 5px;
`;

const LocationImage = styled.img`
  width: 24px; /* 이미지 크기 조절 */
  height: 24px;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
`;

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 37.5665,
  lng: 126.9780
};

export default MapComponent;
