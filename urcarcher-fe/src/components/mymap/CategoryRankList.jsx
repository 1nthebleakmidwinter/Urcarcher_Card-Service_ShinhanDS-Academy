import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';



function CategoryRankList({categoryList}) {


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

    //리스트 개별적으로 저장
    const [paymentCategoryList, setPaymentCategoryList] = useState([]);

    //리스트 한 개씩 나타내기 효과
    useEffect(() => {

        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }


        categoryList.forEach((item, index) => {
            setTimeout(() => {
                setPaymentCategoryList(prev => [...prev, item]);
            }, index * 700); 
        });
    }, [categoryList]); 
    
    //console.log(paymentCategoryList);

    return (
        <div className='rank-list-wrap'>
            <ul className='rank-list inner'>
                {/* paymentCategoryList로 각 항목을 렌더링 */}
                {paymentCategoryList.map((category, index) => (
                    <li 
                        key={index}
                        className={`${index === 0 ? 'first' : ''} ${index < paymentCategoryList.length ? 'show' : ''}`}
                    > 
                     <div>
                     <p className={index === 0 ? 'top-category' : ''}>
                        {t(category.categoryName)}
                    </p>
                         <p>{category.usageCount} {" "+t('Count')}</p>
                     </div>
                 </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryRankList;