import React from 'react';
import 'assets/LoadingSpinner.css'; // 스타일링을 위한 CSS 파일을 추가
// import {BeatLoader} from 'react-spinners';

const LoadingSpinner = () => {
    return (
        <div className="spinner-container">
            {/* 1. 원형 */}
            <div className="loading-spinner"></div>
            {/* 2. 점 (React spinner 라이브러리) */}
            {/* <BeatLoader color="#3cabff" /> */}
        </div>
    );
};

export default LoadingSpinner;