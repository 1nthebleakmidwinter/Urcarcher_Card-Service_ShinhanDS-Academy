package com.urcarcher.be.kimyuri;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Data
public class CardTypeDTO {
	Long cardTypeId;
	String cardName;
	String cardUsage;
	Double cardLimit;
	Double annualFee;
	String cardImg;
}
