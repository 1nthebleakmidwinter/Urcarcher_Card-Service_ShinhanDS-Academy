package com.urcarcher.be.swimming.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ExchangeMemberDTO {
	// private String memberId; // 아이디
	private String nationality; // 국적
}