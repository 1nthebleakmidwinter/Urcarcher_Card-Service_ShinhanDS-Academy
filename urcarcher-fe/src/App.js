import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/Login';
// import Test from './pages/auth/Test';
import Card1 from './pages/card/Card1';
import Card2 from './pages/card/Card2';
import Card3 from './pages/card/Card3';
import Card4 from './pages/card/Card4';
import Card5 from './pages/card/Card5';
import Card6 from './pages/card/Card6';
import Signup from './pages/signup/Signup';
import './assets/RegionList.css';
import MyMapApp from './pages/mymap/MyMapApp';
import MyMapHome from './pages/mymap/MyMapHome';
import CourseList from './pages/tourcourse/CourseList';
import MonthlyChart from './pages/report/MonthlyChart';
import WeeklyChart from './pages/report/WeeklyChart';
import UsageHistory from './pages/report/UsageHistory';
import { CardProvider } from './pages/card/CardContext'; 
import TourGuide from './pages/tourguide/TourGuide';
import DetailPage from './pages/tourguide/DetailPage';
import Home from './pages/Home';
import MyCategoryRank from './pages/mymap/MyCategoryRank';
import BestStoreList from './pages/mymap/BestStoreList';
import ExchangeSelect from './pages/exchange/ExchangeSelect';
import ExchangeCard from './pages/exchange/ExchangeCard';
import ExchangeCurrency from './pages/exchange/ExchangeCurrency';
import ExchangeSet from './pages/exchange/ExchangeSet';
import OAuthNew from './pages/auth/OAuthNew';
import OAuthLoading from './pages/auth/OAuthLoading';
import ExchangeRateList from './pages/exchangeRate/ExchangeRateList';

import CourseDetail from './pages/tourcourse/CourseDetail';
import ExchangeSuccess from './pages/exchange/ExchangeSuccess';
import PerformanceList from './pages/reservation/PerformanceList';
import MapComponent from './pages/location/MapComponent';
import TestCard from './pages/tourguide/TestCard';
import SearchTour from './pages/tourguide/SearchTour';
import Header from 'components/Header';
import Footer from 'components/Footer';
import CardManagerment from 'pages/card/CardManagerment';
import Reservation from 'pages/tourguide/Reservation';
import Payment from 'pages/card/Payment';
import Verification from 'pages/card/Verification';
import ExchangeSetNull from 'pages/exchange/ExchangeSetNull';
import ExchangeSetRate from 'pages/exchange/ExchangeSetRate';
import ExchangeSetSuccess from 'pages/exchange/ExchangeSetSuccess';
import ExchangeHistory from 'pages/exchange/ExchangeHistory';
import ExchangeHistoryCard from 'pages/exchange/ExchangeHistoryCard';
import ExchangeHistoryDetail from 'pages/exchange/ExchangeHistoryDetail';
import PerformanceDetail from 'pages/reservation/PerformanceDetail';
import Reserve from 'pages/reservation/Reserve';
import ReservePayment from 'pages/reservation/ReservePayment';
import SettingPassword from 'pages/card/SettingPassword';
import CardPassword from 'pages/card/CardPassword';
import Reward from 'pages/tourcourse/Reward';
import MyReservations1 from './pages/reservation/MyReservations1';
import LocalProduct from 'pages/localProducts/LocalProduct';
import PrivateRoute from 'pages/auth/PrivateRoute';
import MyReservations1Detail from './pages/reservation/MyReservations1Detail';
import FAQ from 'pages/faq/FAQ';

function App() {
  return (
    <CardProvider>
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/login/loading' element={<OAuthLoading/>}/>
          <Route path='/login/new' element={<OAuthNew/>}/>
          <Route path='/exchange/realtime/rate' element={<ExchangeRateList/>}/>
          {/* <Route path='/test' element={<Test/>}/> */}
          <Route path='/card1' element={<Card1/>}/>
          <Route path='/courseList' element={<CourseList/>}/>
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path='/signup/*' element={<Signup/>}/>
          <Route path='/reward' element={<Reward/>}/>
          <Route  path='/maphome' element={<MyMapHome />}></Route>
          <Route  path='/maphome/map' element={<MyMapApp />}></Route>
          <Route  path='/maphome/categoryRank' element={<MyCategoryRank />}></Route>
          <Route  path='/maphome/beststorelist' element={<BestStoreList />}></Route>        
          <Route path='/exchange' element={<ExchangeSelect/>}></Route>
          <Route path='/exchange/card' element={<ExchangeCard/>}></Route>
          <Route path='/exchange/currency' element={<ExchangeCurrency/>}></Route>
          <Route path='/exchange/success' element={<ExchangeSuccess/>}></Route>
          <Route path='/exchange/set' element={<ExchangeSet/>}></Route>
          <Route path='/exchange/set/rate' element={<ExchangeSetRate/>}></Route>
          <Route path='/exchange/set/success' element={<ExchangeSetSuccess/>}></Route>
          <Route path='/exchange/history/card' element={<ExchangeHistoryCard/>}></Route>
          <Route path='/exchange/history' element={<ExchangeHistory/>}></Route>
          <Route path='/exchange/history/detail' element={<ExchangeHistoryDetail/>}></Route>
          <Route path='/MapComponent' element={<MapComponent/>}></Route>
          <Route path='/MapComponent/:detailDestination' element={<MapComponent/>}/>
          <Route path='/TourGuide/:areaCode/:contentTypeId' element={<TourGuide/>}/>
          <Route path='/detail/:type/:id' element={<DetailPage/>}/>
          <Route path='/performanceList' element={<PerformanceList/>}/>
          <Route path='/reserve' element={<Reserve/>}/>
          <Route path='/reservePayment' element={<ReservePayment/>}></Route>
          <Route path='/searchtour' element={<SearchTour/>}></Route>
          <Route path='/testcard' element={<TestCard/>}/>
          <Route path='/localProducts' element={<LocalProduct/>}></Route>
          <Route path='/faq' element={<FAQ/>}></Route>

          <Route element={<PrivateRoute />}>
            <Route path='/reservation1' element={<Reservation />} />
            <Route path='/cardmanagement' element={<CardManagerment/>}></Route>
            <Route path='/verification' element={<Verification/>}></Route>
            <Route path='/card2' element={<Card2/>}/>
            <Route path='/card3' element={<Card3 />}/>
            <Route path='/card4' element={<Card4 />}/>
            <Route path='/card5' element={<Card5 />}/>
            <Route path='/card6' element={<Card6 />}/>
            <Route path='/cardPass' element={<CardPassword/>}></Route>
            <Route path='/usage' element={<UsageHistory/>}/>
            <Route path='/chart1' element={<MonthlyChart/>}/>
            <Route path='/chart2' element={<WeeklyChart/>}/>
            <Route path='/paymentpage' element={<Payment/>}></Route>
            <Route path='/myReservationList1' element={<MyReservations1/>}></Route>
            <Route path='/myReservationList1Detail/:reservationId' element={<MyReservations1Detail/>}></Route>
            {/* <Route path='/reserve' element={<Reserve/>}/>
            <Route path='/reservePayment' element={<ReservePayment/>}></Route> */}
            <Route path='/performanceList/detail/:id' element={<PerformanceDetail/>}/>
          </Route>
        </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  </CardProvider>
  );
}
export default App;