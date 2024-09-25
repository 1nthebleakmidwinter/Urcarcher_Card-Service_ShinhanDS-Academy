package com.urcarcher.be.swimming.dto;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ExchangeInfoDTO {
	private Long exId; // 환전번호 (PK)
	private Long setId; // 예약번호 (FK)
	private Long cardId; // 카드 ID (FK)
	private String cardUsage; // 카드분류
	private Double cardBalance; // 카드 잔액
	private Double exRate; // 적용환율
	private Long exCur; // 환전금액
	private Double exPay; // 결제금액 (원화)
	private Timestamp exDate; // 환전일
}