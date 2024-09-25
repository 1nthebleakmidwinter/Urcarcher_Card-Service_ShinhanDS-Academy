import React, { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { useNavigate } from 'react-router-dom';

function OAuthLoading(props) {
    const nav = useNavigate();

    useEffect(()=>{
        let email_role_provider = cookie.load("email_role_provider");
        if(email_role_provider != null) {
            email_role_provider = email_role_provider.split("_");
            let data = {
                email: email_role_provider[0],
                role: email_role_provider[1],
                provider: email_role_provider[2]
            };
            if(data.role == "GUEST") {
                nav("/login/new", {
                    state: {
                        email: data.email,
                        role: data.role,
                        provider: data.provider,
                    }
                });
            } else {
                nav("/");
            }
        } else {
            nav("/login");
        }
        cookie.remove("email_role_provider", {path: "/"});
    }, []);

    return (
        <div>
        </div>
    );
}

export default OAuthLoading;