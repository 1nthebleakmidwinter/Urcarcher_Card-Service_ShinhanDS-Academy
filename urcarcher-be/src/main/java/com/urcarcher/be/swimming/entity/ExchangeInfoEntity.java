package com.urcarcher.be.swimming.entity;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import com.urcarcher.be.kimyuri.CardEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "EXCHANGE_INFO")
public class ExchangeInfoEntity {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private Long exId; // 환전번호
	
	private Double exRate; // 적용환율
	
	private Long exCur; // 환전금액

	private Double exPay; // 결제금액 (원화)
	
	@CreationTimestamp
	private Timestamp exDate; // 환전일
	
	@JoinColumn(name = "set_id", nullable = true)
	@ManyToOne(fetch = FetchType.LAZY)
	ExchangeSetEntity exchangeSet; // 환전예약 table
	
	@JoinColumn(name = "card_id")
	@ManyToOne
	CardEntity card; // 카드 table
}