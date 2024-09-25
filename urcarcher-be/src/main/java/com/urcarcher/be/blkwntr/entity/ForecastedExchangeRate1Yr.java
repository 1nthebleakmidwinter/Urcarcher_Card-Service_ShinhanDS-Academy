package com.urcarcher.be.blkwntr.entity;

import java.math.BigDecimal;
import java.util.Date;

import com.urcarcher.be.blkwntr.exrate.ExchangeType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="FORECASTED_EX_RATE_1YR")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ForecastedExchangeRate1Yr {
	@Id
	private String forecastId;
	
	@Temporal(TemporalType.DATE)
	private Date forecastedDate;
	
	private BigDecimal forecastedOpen;
	private BigDecimal forecastedHigh;
	private BigDecimal forecastedLow;
	private BigDecimal forecastedClose;
	private BigDecimal forecastedChange;
	
	@Enumerated(EnumType.STRING)
	private ExchangeType exchangeType;
}
