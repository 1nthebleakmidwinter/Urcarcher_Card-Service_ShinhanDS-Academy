import React, { useState } from 'react';
import './faq.css';
import FAQImg from 'assets/faq.png'

// FAQ 데이터를 배열로 정의 (예시)
const faqData = [
    {
        id: 1,
        question: "어카처란?",
        answer: "어카처는 '어서와 카드는 처음이지'의 줄임말로, 금융 관광 특화 카드 서비스입니다. 카드 발급 이외에도 금융과 관광 특화의 다양한 서비스를 제공하고 있습니다."
    },
    {
        id: 2,
        question: "회원가입은 어떻게 하나요?",
        answer: "메인화면 또는 우측 하단 메뉴에서 로그인을 클릭한 후 나오는 페이지 우측 하단에 회원가입이 있습니다. 자사 회원가입과 구글,애플을 통한 소셜 회원가입이 가능합니다."
    },
    {
        id: 3,
        question: "카드 수령 및 리워드 수령은 어디에서 하나요?",
        answer: "인천국제공항 제1여객터미널 1층 12번 출구 앞 '어카처' 센터 제1여객터미널점, 인천국제공항 제2여객터미널 3층 7번 출구 앞 '어카처'센터 제2여객터미널점 운영 시간(07:00~22:00)에 본인 확인(어카처 로그인 화면 또는 주민등록증/외국인등록증) 후 수령이 가능합니다. 추후 영업점을 늘려 더 다양한 곳에서도 수령 가능하게 할 계획입니다."
    },
    {
        id: 4,
        question: "그 외 궁금한 점이 있어요.",
        answer: "어카처 공식 이메일(question@urcarcher.com)에 질문하시면 빠른 시일 내에 답변 드리겠습니다. 빠른 처리가 필요한 건은 어카처 공식 전화번호(02-XXXX-XXXX)로 연락바랍니다."
    }
];

function FAQ() {
    // 상태를 사용하여 각 FAQ 항목의 열림/닫힘 상태를 관리합니다.
    const [openFAQ, setOpenFAQ] = useState(null);

    // FAQ 항목을 클릭할 때 호출되는 핸들러
    const handleFAQClick = (id) => {
        setOpenFAQ(openFAQ === id ? null : id);
    };

    return (
        <div className="faq-container" style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <img src={FAQImg} alt="faqImg" width="150" height="150"></img>
            {/* 아이콘 제작자: berkahicon - Flaticon</a> */}
            <h1>자주 묻는 질문</h1>
            <br></br>
            <br></br>
            <div>
                {faqData.map((faq) => (
                    <div key={faq.id} className="faq-item" style={{ marginBottom: '15px' }}>
                        <div 
                            className="faq-question" 
                            onClick={() => handleFAQClick(faq.id)} 
                            style={{ cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            {faq.question}
                        </div>
                        {openFAQ === faq.id && (
                            <div className="faq-answer" style={{ marginTop: '5px' }}>
                                &nbsp;{faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FAQ;
