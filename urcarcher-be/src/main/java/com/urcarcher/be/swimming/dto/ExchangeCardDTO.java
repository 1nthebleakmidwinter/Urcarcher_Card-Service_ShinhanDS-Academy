package com.urcarcher.be.swimming.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ExchangeCardDTO {
	private Long cardId; // 카드 ID
	private String cardNumber; // 카드번호
	private Double cardBalance; // 카드잔액
	private String cardUsage; // 카드분류
	private Long cardTypeId; // 카드 타입
}