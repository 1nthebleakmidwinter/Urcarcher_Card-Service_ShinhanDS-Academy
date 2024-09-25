//package com.urcarcher.be.jjjh.entity;
//
//import java.time.LocalDateTime;
//
//import com.urcarcher.be.kimyuri.CardEntity;
//import com.urcarcher.be.kimyuri.PaymentEntity;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
////@Entity
////@Table(name = "test_payment")
//public class TestPaymentEntity {
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	Long paymentId;
//
//	@Column(nullable = false)
//	Double paymentPrice;
//	
//	@Column(nullable = false)
//	LocalDateTime paymentDate;
//
////	String card_id;
////	
////	String store_id;
//	
//	
//	// N:1 관계 설정 - 여러 결제가 하나의 카드와 연결될 수 있음
////    @ManyToOne(fetch = FetchType.LAZY)
////    @JoinColumn(name = "card_id", nullable = false)
//    TestCardEntity card; // FK로 설정
//
//    // N:1 관계 설정 - 여러 결제가 하나의 상점과 연결될 수 있음
////    @ManyToOne(fetch = FetchType.LAZY)
////    @JoinColumn(name = "store_id", nullable = false)
//    StoreEntity store; // FK로 설정
//	
//}
