import React, { createContext, useContext, useState } from 'react';

const CardContext = createContext(); // 컨텍스트 객체를 생성

//  useContext를 사용하여 CardContext의 현재 값을 반환
export const useCardContext = () => {
    return useContext(CardContext);
};

// 16자리의 랜덤 카드 번호를 생성하는 함수
export const generateRandomCardNumber = () => {
    let cardNumber = '';
    for(let i = 0; i < 4; i++) {
        cardNumber += Math.floor(1000 + Math.random() * 9000).toString() + ' ';
    }
    return cardNumber.trim();
}

// 3자리의 랜덤 CVV 코드를 생성하는 함수
export const generateRandomCVVCode = () => {
    return Math.floor(Math.random() * 900 + 100).toString().padStart(3, '0');
};

// 현재 날짜를 'YYYY-MM-DD' 형식으로 반환하는 함수
export const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// 현재 날짜로부터 5년 후의 날짜를 'YYYY-MM-DD' 형식으로 반환하는 함수
export const getExpirationDate = () => {
    const date = new Date();
    const year = date.getFullYear() + 5;
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};



export const CardProvider = ({children}) => {
    const [produceCardOffer, setProduceCardOffer] = useState({
        "card_id": null,
        "card_account":null,
        "card_balance" : 0, 
        "card_number":generateRandomCardNumber(),
        "card_password":null,
        "card_pickup":null,
        "card_status":true,
        "cvv_code":generateRandomCVVCode(),
        "expiration_date":getExpirationDate(),
        "issue_date":getCurrentDate(),
        "payment_bank":null,
        "payment_date":null,
        "pickup_date":null,
        "transportation":null,
        "card_type_id":null,
        "member_id":null  // member T
    });

    return (
        <CardContext.Provider value={{produceCardOffer, setProduceCardOffer}}>
            {children}
        </CardContext.Provider>
    )
}