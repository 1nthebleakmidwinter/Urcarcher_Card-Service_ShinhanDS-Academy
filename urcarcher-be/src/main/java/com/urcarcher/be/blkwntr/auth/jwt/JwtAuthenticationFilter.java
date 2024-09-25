package com.urcarcher.be.blkwntr.auth.jwt;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import com.urcarcher.be.common.CookieUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {
	
	private final JwtTokenProvider jwtTokenProvider;
	private final JwtCookieProvider jwtCookieProvider;
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletRequest http_request = (HttpServletRequest) request;
		HttpServletResponse http_response = (HttpServletResponse) response;
		
		String refreshToken = jwtCookieProvider.getRefreshToken(http_request);
		
		String token = resolveToken(http_request);
		
		if(token != null) {
			Authentication authentication = jwtTokenProvider.getAuthentication(token);
			if(jwtTokenProvider.validateToken(token)) {
				SecurityContextHolder.getContext().setAuthentication(authentication);
			} else {
				if(refreshToken != null) {
					if(jwtTokenProvider.validateToken(refreshToken)) {
						http_response.addCookie(jwtCookieProvider.createCookieForAccessToken(jwtTokenProvider.generateAccessToken(authentication)));
						SecurityContextHolder.getContext().setAuthentication(authentication);
					}
				}
			}
		}
		
		chain.doFilter(request, response);
		
	}
	
	private String resolveToken(HttpServletRequest request) {
//		String bearerToken = request.getHeader("Authorization");
//		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
//			return bearerToken.substring(7);
//		}
		Cookie accessTokenCookie = CookieUtils.getCookie(request, "URCARCHER_ACCESS_TOKEN").orElse(null);
		if(accessTokenCookie != null) return accessTokenCookie.getValue();
		return null;
	}
}
