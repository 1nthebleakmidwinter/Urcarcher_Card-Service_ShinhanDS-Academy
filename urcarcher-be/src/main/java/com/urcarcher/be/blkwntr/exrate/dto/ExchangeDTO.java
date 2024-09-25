package com.urcarcher.be.blkwntr.exrate.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ExchangeDTO {
	private String exchangeType;
	private String country;
	private String exchangeName;
	private String rate;
	private String buy;
	private String sell;
	private String give;
	private String take;
	private String dollarIndex;
	private String date;
	private String standard;
	private String round;
}
