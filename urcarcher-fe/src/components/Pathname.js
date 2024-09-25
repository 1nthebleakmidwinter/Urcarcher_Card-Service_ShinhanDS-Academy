export  const getTitle = (pathname) => {

    const cleanedPathname = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

    switch (cleanedPathname) { // => 추가 경로에 따라 제목 설정
        case '/maphome':
        case '/maphome/map':
        case '/maphome/categoryRank':
        case '/maphome/beststorelist':
            return 'MyOwnMap';
        case '/courseList': 
            return 'TourCourse';
        case '/card1':
        case '/card2':
        case '/card3':
        case '/card4':
        case '/card5':
        case '/card6':
        case '/cardverification':
            return 'ApplyCard2';
        case '/usage':
            return 'CardUsageDetails';
        case '/chart1':
        case '/chart2':
            return 'ReportMenu'; 
        case '/cardmanagement': 
            return 'MyCard'; 
        case '/exchange':  
        case '/exchange/currency':
        case '/exchange/success':
            return 'CurrencyExchange';
        case '/exchange/card':
            return 'SelectCard';
        case '/exchange/set':
        case '/exchange/set/rate':
        case '/exchange/set/success':
            return 'AutoExchange';
        case '/exchange/history/card':
        case '/exchange/history':
        case '/exchange/history/detail':
            return 'ExchangeHistory';
        case '/exchange/realtime/rate':
            return 'RealtimeExchangeRate';
        // case '/reservation':
        //     return 'culturalActivityReservation';
        case '/performanceList':
            return 'culturalActivityReservation';
        case '/searchtour': 
            return 'TouristAttractionsAndRestaurants';
        case '/MapComponent':  
            return 'FindRoute';
        case '/signup':
        case '/signup/success':
        case '/signup/userinfo':
            return 'SignUp';
        case '/login':
            return 'Login2';
        case '/reward':
            return 'Reward';
        case '/myReservationList1':
            return 'BookingConfirmation';
        case '/localProducts':
            return 'RecommendedLocal'
        case '/faq':
            return 'FAQ';
        default:
            return handleDynamicPaths(cleanedPathname); // 가변 경로 처리
    }
};
export  const handleDynamicPaths = (pathname) => {
    // /tourguide/:areaCode/:contentTypeId 패턴 => contentTypeId 12:관광지, 39:맛집 
    const tourGuideMatch = /^\/tourguide\/[^\/]+\/([^\/]+)$/.exec(pathname);
    if (tourGuideMatch) {
        const [, contentTypeId] = tourGuideMatch;
        return getTourGuideTitle(contentTypeId);
    }
    // /detail/:type/:id 패턴
    if (/^\/detail\/[^\/]+\/[^\/]+$/.test(pathname)) {
        return 'detailPage';
    }
    // /course/:courseId 패턴
    if (/^\/course\/[^\/]+$/.test(pathname)) {
        return 'travelCourseDetail';
    }
    // /MapComponent/:detailDestination 패턴
    if (/^\/MapComponent\/[^\/]+$/.test(pathname)) {
        return 'FindRoute';
    }

    // if (/^\/reservation\/detail/.test(pathname)) {
    //     return 'culturalActivityReservation';
    //   }

      if (/^\/performanceList\/detail/.test(pathname)) {
        return 'culturalActivityReservation';
      }

      if (/^\/myReservationList1Detail/.test(pathname)) {
        return 'reservationDetails';
      }
    return 'other';
}

// :contentTypeId에 따라 제목을 반환하는 함수
export  const getTourGuideTitle = (contentTypeId) => {
    switch (contentTypeId) {
        case '12':
            return '관광지 추천';
        case '39':
            return '맛집 추천';
        default:
            return '관광지 및 맛집 추천';
    }
};