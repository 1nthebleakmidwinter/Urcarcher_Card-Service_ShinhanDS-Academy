package com.urcarcher.be.swimming.entity;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.urcarcher.be.kimyuri.CardEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString(exclude = {"card", "infoList"})
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "EXCHANGE_SET")
public class ExchangeSetEntity {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private Long setId; // 예약번호

	// private Double setRate; // 예약환율 (시가)
	
	private Long setCur; // 예약금액
	
	// private Double setPay; // 결제금액 (원화)
	
	private LocalDate setDate; // 예약일
	
	@CreationTimestamp
	private Timestamp setUpdate; // 등록일
	
	private String setStatus; // 환전상태
	
	private String nationality; // 국적
	
	// ExchangeInfoEntity 클래스에 있는 필드명
	@OneToMany(mappedBy = "exchangeSet", 
			cascade = CascadeType.ALL,
			fetch = FetchType.LAZY)
	List<ExchangeInfoEntity> infoList; // 환전내역 리스트
	
	@JoinColumn(name = "card_id", unique = false)
	@ManyToOne(fetch = FetchType.LAZY)
	CardEntity card; // 카드 table
}