package com.urcarcher.be.swimming.dto;

import java.sql.Timestamp;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ExchangeSetDTO {
	private Long setId; // 예약번호 (PK)
	private Long cardId; // 카드 ID (FK)
	private String cardUsage; // 카드분류
	// private Double setRate; // 예약환율
	private Long setCur; // 예약금액
	// private Double setPay; // 결제금액 (원화)
	private LocalDate setDate; // 예약일
	private Timestamp setUpdate; // 등록일
	private String setStatus; // 환전상태
	private String nationality; // 국적
}