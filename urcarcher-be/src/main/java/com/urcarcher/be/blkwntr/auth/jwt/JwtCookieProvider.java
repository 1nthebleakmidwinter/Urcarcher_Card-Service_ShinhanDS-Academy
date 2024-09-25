package com.urcarcher.be.blkwntr.auth.jwt;

import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtCookieProvider {
	
	public Cookie createOAuthInfoCookie(String email, String role, String provider) {
		Cookie infoCookie = new Cookie("email_role_provider", email + "_" + role + "_" + provider);
		infoCookie.setPath("/");
		return infoCookie;
	}
	
	public Cookie createCookieForAccessToken(String accessToken) {
		Cookie cookieForAccessToken = new Cookie("URCARCHER_ACCESS_TOKEN", accessToken);
		cookieForAccessToken.setPath("/");
		return cookieForAccessToken;
	}
	
	public Cookie createCookieForRefreshToken(String refreshToken) {
		Cookie cookieForRefreshToken = new Cookie("URCARCHER_REFRESH_TOKEN", refreshToken);
		cookieForRefreshToken.setHttpOnly(true);
		cookieForRefreshToken.setSecure(true);
		cookieForRefreshToken.setAttribute("SameSite", "None");
		cookieForRefreshToken.setPath("/");
		return cookieForRefreshToken;
	}
	
	public Cookie deleteCookieForAccessToken() {
		Cookie deleteForAccessToken = new Cookie("URCARCHER_ACCESS_TOKEN", "");
		deleteForAccessToken.setPath("/");
		deleteForAccessToken.setMaxAge(0);
		return deleteForAccessToken;
	}
	
	public Cookie deleteCookieForRefreshToken() {
		Cookie deleteForRefreshToken = new Cookie("URCARCHER_REFRESH_TOKEN", "");
		deleteForRefreshToken.setHttpOnly(true);
		deleteForRefreshToken.setSecure(true);
		deleteForRefreshToken.setAttribute("SameSite", "None");
		deleteForRefreshToken.setPath("/");
		deleteForRefreshToken.setMaxAge(0);
		return deleteForRefreshToken;
	}
	
	public String getRefreshToken(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if(cookies != null) {
			for(Cookie cookie :cookies) {
				if(cookie.getName().equals("URCARCHER_REFRESH_TOKEN")) return cookie.getValue();
			}			
		}
		return null;
	}
}
