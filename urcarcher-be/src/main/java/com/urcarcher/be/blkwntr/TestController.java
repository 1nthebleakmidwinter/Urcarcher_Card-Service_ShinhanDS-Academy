package com.urcarcher.be.blkwntr;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.urcarcher.be.blkwntr.auth.AuthorizedUser;
import com.urcarcher.be.blkwntr.auth.jwt.JwtTokenProvider;
import com.urcarcher.be.blkwntr.auth.service.UrcarcherOAuth2Service;
import com.urcarcher.be.blkwntr.auth.service.VanillaAuthorizingService;
import com.urcarcher.be.blkwntr.entity.Member;
import com.urcarcher.be.blkwntr.exrate.ExchangeType;
import com.urcarcher.be.blkwntr.exrate.service.ExchangeRateService;

import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;

@RestController
@RequestMapping("/api/t")
@RequiredArgsConstructor
public class TestController {
	
	private final VanillaAuthorizingService vanillaAuthorizingService;
	private final UrcarcherOAuth2Service urcarcherOAuth2Service;
	private final JwtTokenProvider jwtTokenProvider;
	
	@GetMapping("/test")
	Member test(@AuthenticationPrincipal UserDetails userDetails) {
		System.out.println(userDetails.getUsername());
		return vanillaAuthorizingService.getMemberByAuth(userDetails);
	}
	
	@GetMapping("/test2")
	Member test2() {
		AuthorizedUser authorizedUser = (AuthorizedUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		System.out.println(authorizedUser);
		return authorizedUser.getMember();
	}
	
	@PostMapping("/test3")
	Member test3(@RequestBody TestDTO test, @AuthenticationPrincipal UserDetails userDetails) {
		System.out.println(userDetails.getUsername() + test.getCourseId() + test.getPlaceId());
		return null;
	}
	
	@GetMapping("/vali")
	Map<String, String> test3(@CookieValue("URCARCHER_REFRESH_TOKEN") String refreshToken) {
		Map<String, String> result = new HashMap<>();
		result.put("result", jwtTokenProvider.validateToken(refreshToken) ? "true":"false");
		return result;
	}
	
	@GetMapping("/extest/all")
	Map<ExchangeType, JSONObject> test4() {
		return ExchangeRateService.getAllRateInfo();
	}
	
	@GetMapping("/extest/one")
	JSONObject test5() {
		return ExchangeRateService.getRateInfoByExType(ExchangeType.USD);
	}

}


