import React, { useEffect, useState } from 'react';

function RandomImage(props) {

    //사용할 이미지 목록
    const images = [
        { src: "/icon/random/basket.png", alt: "바구니" },
        { src: "/icon/random/cake.png", alt: "케이크" },
        { src: "/icon/random/pencil.png", alt: "연필" },
        { src: "/icon/random/spoon.png", alt: "스푼" }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true); // 페이드 애니메이션 효과를 위한 상태

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // 페이드 아웃 시작

            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFade(true); // 페이드 인 시작
            }, 500); // 페이드 아웃 시간과 일치시킴
        }, 2000); // 2초마다 이미지 변경

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
    }, []);

    return (
        <div className='category-img' 
            style={{ width: '180px', height: '160px', overflow: 'hidden',margin: '0 auto' }}>
            <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                style={{
                    width: '100%',
                    height: '100%',
                    opacity: fade ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out'
                }}
            />
        </div>
    );
}

export default RandomImage;