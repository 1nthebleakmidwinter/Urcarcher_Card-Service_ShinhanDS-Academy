package com.urcarcher.be.kimyuri;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "card_type")
public class CardTypeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long cardTypeId;
	
	@Column(length = 100, nullable = false)
	String cardName; // 카드이름
	@Column(length = 100, nullable = false)
	String cardUsage; // 카드사용목적
	@Column
	Double cardLimit; //카드한도
	@Column
	Double annualFee; // 연회비
	@Column(length = 100, nullable = false)
	String cardImg;
}
