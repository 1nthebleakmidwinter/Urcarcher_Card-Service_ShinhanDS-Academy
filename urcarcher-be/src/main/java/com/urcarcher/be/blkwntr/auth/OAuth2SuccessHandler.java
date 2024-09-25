package com.urcarcher.be.blkwntr.auth;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.urcarcher.be.blkwntr.auth.dto.TokenDTO;
import com.urcarcher.be.blkwntr.auth.jwt.JwtCookieProvider;
import com.urcarcher.be.blkwntr.auth.jwt.JwtTokenProvider;
import com.urcarcher.be.blkwntr.entity.Member;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	
	private final JwtTokenProvider jwtTokenProvider;
	private final JwtCookieProvider jwtCookieProvider;
	
	@Value("${OAUTH2_SUCCESS_TARGET_URL}")
	private String targetURL;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) 
			throws IOException, ServletException {
		
		AuthorizedUser authorizedUser = (AuthorizedUser) authentication.getPrincipal();
		Member currentOAuthMember = authorizedUser.getMember();
		
		response.addCookie(jwtCookieProvider.createOAuthInfoCookie(currentOAuthMember.getEmail(), currentOAuthMember.getRole().name(), currentOAuthMember.getProvider().name()));
		
		if(currentOAuthMember.getRole() != MemberRole.GUEST) {
			TokenDTO token = jwtTokenProvider.generateToken(authentication);
			response.addCookie(jwtCookieProvider.createCookieForAccessToken(token.getAccessToken()));
			response.addCookie(jwtCookieProvider.createCookieForRefreshToken(token.getRefreshToken()));
		}
		
		getRedirectStrategy().sendRedirect(request, response, targetURL);
	}
	
}
