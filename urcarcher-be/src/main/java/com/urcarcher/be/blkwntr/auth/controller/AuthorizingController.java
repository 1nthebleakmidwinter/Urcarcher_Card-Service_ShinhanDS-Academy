package com.urcarcher.be.blkwntr.auth.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.urcarcher.be.blkwntr.auth.MemberProvider;
import com.urcarcher.be.blkwntr.auth.MemberRole;
import com.urcarcher.be.blkwntr.auth.dto.LoginRequestDTO;
import com.urcarcher.be.blkwntr.auth.dto.OAuthNewRequestDTO;
import com.urcarcher.be.blkwntr.auth.dto.SimpleUserInfo;
import com.urcarcher.be.blkwntr.auth.dto.TokenDTO;
import com.urcarcher.be.blkwntr.auth.jwt.JwtCookieProvider;
import com.urcarcher.be.blkwntr.auth.jwt.JwtTokenProvider;
import com.urcarcher.be.blkwntr.auth.service.UrcarcherOAuth2Service;
import com.urcarcher.be.blkwntr.auth.service.VanillaAuthorizingService;
import com.urcarcher.be.blkwntr.entity.Member;
import com.urcarcher.be.common.CookieUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthorizingController {
	private final UrcarcherOAuth2Service urcarcherOAuth2Service;
	private final VanillaAuthorizingService vanillaAuthorizingService;
	private final JwtCookieProvider jwtCookieProvider;
	private final JwtTokenProvider jwtTokenProvider;
	
	@PostMapping("/login")
	public ResponseEntity<TokenDTO> login(@RequestBody LoginRequestDTO loginRequestDTO, HttpServletResponse response) {
		String memberId = loginRequestDTO.getMemberId();
		String password = loginRequestDTO.getPassword();
		String on = loginRequestDTO.getAgree();
		TokenDTO tokenDTO = vanillaAuthorizingService.loginChk(memberId, password);
		
		if(on != null) response.addCookie(jwtCookieProvider.createCookieForRefreshToken(tokenDTO.getRefreshToken()));
		
		return ResponseEntity.ok(tokenDTO);
	}
	
	@PostMapping("/oauth/new")
	public ResponseEntity<Member> oauthNew(@RequestBody OAuthNewRequestDTO oAuthNewRequestDTO) {
		return ResponseEntity.ok(urcarcherOAuth2Service.oauthNew(oAuthNewRequestDTO));
	}
	
	@PostMapping("/logout")
	public ResponseEntity<Object> logout(HttpServletResponse response) {
		response.addCookie(jwtCookieProvider.deleteCookieForAccessToken());
		try {
			response.addCookie(jwtCookieProvider.deleteCookieForRefreshToken());			
		} catch (Exception e) {
			// TODO: handle exception
		}
		return ResponseEntity.ok(null);
	}
	
	@GetMapping("/authorizing")
	public ResponseEntity<SimpleUserInfo> authorizing(HttpServletRequest request, @AuthenticationPrincipal UserDetails userDetails) {
		return ResponseEntity.ok(
				SimpleUserInfo.builder()
				.isAuthorized(jwtTokenProvider.validateToken(CookieUtils.getCookie(request, "URCARCHER_ACCESS_TOKEN").orElseThrow().getValue()))
				.name(vanillaAuthorizingService.getMemberByAuth(userDetails).getName())
				.memberId(userDetails != null ? userDetails.getUsername() : null)
				.build());
	}
}
