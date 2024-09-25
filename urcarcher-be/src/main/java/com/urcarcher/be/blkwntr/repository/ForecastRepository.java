package com.urcarcher.be.blkwntr.repository;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.urcarcher.be.blkwntr.entity.ForecastedExchangeRate1Yr;
import com.urcarcher.be.blkwntr.exrate.ExchangeType;

public interface ForecastRepository extends JpaRepository<ForecastedExchangeRate1Yr, String> {
	Optional<List<ForecastedExchangeRate1Yr>> findByExchangeTypeOrderByForecastedDateAsc(ExchangeType exchangeType);
}
