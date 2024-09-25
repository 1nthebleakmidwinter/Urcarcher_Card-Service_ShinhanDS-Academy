package com.urcarcher.be.blkwntr.exrate.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.urcarcher.be.blkwntr.entity.ForecastedExchangeRate1Yr;
import com.urcarcher.be.blkwntr.exrate.ExchangeType;
import com.urcarcher.be.blkwntr.repository.ForecastRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ForecastService {
	
	private final ForecastRepository forecastRepository;
	
	public List<ForecastedExchangeRate1Yr> getForecastResultByExchangeType(ExchangeType exchangeType) throws Exception {
		return forecastRepository.findByExchangeTypeOrderByForecastedDateAsc(exchangeType).orElseThrow(()->new Exception("조회된 환율이 없어요!"));
	}
}
