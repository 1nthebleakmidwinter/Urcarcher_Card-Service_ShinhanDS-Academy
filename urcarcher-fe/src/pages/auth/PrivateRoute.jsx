import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { options_GET } from 'services/CommonService';

const PrivateRoute = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('URCARCHER_ACCESS_TOKEN'); // 쿠키에서 토큰을 가져옴

    if (!token) {
      // 토큰이 없으면 즉시 로그인 페이지로 리디렉션
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    axios(options_GET("/api/auth/authorizing", null))
      .then((resp) => {
        if (resp.data.isAuthorized) {
          setIsAuthenticated(true); // 토큰이 유효한 경우
        } else {
          // 토큰이 만료된 경우
          Cookies.remove('URCARCHER_ACCESS_TOKEN', { path: '/' });
          setIsAuthenticated(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false); // 로딩 완료
      });
  }, []);

  if (isLoading) {
    return null; // 로딩 중일 때 아무 것도 렌더링하지 않음
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      state={{ from: location }} // 현재 위치를 상태로 전달
      replace
    />
  );
};

export default PrivateRoute;
