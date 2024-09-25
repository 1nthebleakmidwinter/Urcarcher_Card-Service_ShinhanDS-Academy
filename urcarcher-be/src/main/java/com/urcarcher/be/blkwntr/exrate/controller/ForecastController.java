package com.urcarcher.be.blkwntr.exrate.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.urcarcher.be.blkwntr.entity.ForecastedExchangeRate1Yr;
import com.urcarcher.be.blkwntr.exrate.ExchangeType;
import com.urcarcher.be.blkwntr.exrate.service.ForecastService;
import com.urcarcher.be.blkwntr.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/fore")
@RequiredArgsConstructor
public class ForecastController {
	
	private final ForecastService forecastService;
	private final MemberRepository memberRepository;
	
	@GetMapping("/list")
	public ResponseEntity<List<ForecastedExchangeRate1Yr>> getForecastedList(@AuthenticationPrincipal UserDetails userDetails) throws Exception {
		return ResponseEntity.ok(forecastService
									.getForecastResultByExchangeType(
											Arrays
											.stream(ExchangeType.values())
											.filter(exType -> exType
																.name()
																.substring(0, 2)
																.equals(memberRepository
																		.findById(userDetails.getUsername())
																		.get()
																		.getNationality()))
											.findFirst()
											.get()));
	}
	
}
