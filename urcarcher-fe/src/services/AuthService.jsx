import axios from 'axios';
import cookie from 'react-cookies';
import { options, options_GET, options_POST } from 'services/CommonService'

const ACCESS_TOKEN = "URCARCHER_ACCESS_TOKEN";

export async function signin(userDTO) {
  try {
    const resp = await axios(options("/api/auth/login", "POST", userDTO));
    if(resp.data.accessToken) {
      cookie.save(ACCESS_TOKEN, resp.data.accessToken, { path:"/" });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

export function oauthNew(userDTO) {
  axios(options("/api/auth/oauth/new", "POST", userDTO))
    .then(resp=>{
      if(resp.status == 200) {
        window.location.href = "/";
      }
    })
    .catch(err=>{
      // console.log(err);
      window.location.href = "/login";
    });
}

export function logout() {
  axios(options_POST("/api/auth/logout", null))
    .then(resp=>{
      if(resp.status == 200) {
        window.location.href = "/";
      }
    })
    .catch(err=>{
      console.log(err);
    });
}