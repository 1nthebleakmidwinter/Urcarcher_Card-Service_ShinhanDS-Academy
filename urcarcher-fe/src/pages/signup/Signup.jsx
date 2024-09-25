import React, { useState } from 'react';
//import './signup.css'; 
import { Route, Routes } from 'react-router-dom';
import ConsentForm from './ConsentForm';
import UserInfoForm from './UserInfoForm';
import Success from './Success';
import "assets/Test.css"
import "./signup.css"


function LocalSignupFlow(props) {
    // const [consentData, setConsentData] = useState({
    //     personalInfoConsent: false,
    //     locationConsent: false,
    //     matchingServiceConsent: false,
    // });

    // const [userInfo, setUserInfo] = useState({
    //     id: '',
    //     password: '',
    //     name: '',
    //     birth: '',
    //     gender: '',
    //     nationality: '',
    //     email: '',
    //     phone: '',
    // });

    // const saveConsentData = (data) =>{
    //     setConsentData(data);
    // }
    
    // const saveUserInfo = (info) => {
    //     setUserInfo(info);
    // };

    // const handleSubmit = () => {
    //     console.log('Submit to DB', {...userInfo, ...consentData});
    // };

    return (
       <Routes>
            <Route path = "/" element={<ConsentForm/>}/>
            <Route path="/local" element={<LocalSignupFlow/>}></Route>
                <Route path = "/userInfo" element={<UserInfoForm    />}/>
                <Route path = "/success" element={<Success    />}/>
        </Routes>
    );
}

export default LocalSignupFlow;