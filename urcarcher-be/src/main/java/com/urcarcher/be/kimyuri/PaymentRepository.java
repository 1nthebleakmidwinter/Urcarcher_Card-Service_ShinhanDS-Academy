package com.urcarcher.be.kimyuri;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {

 List<PaymentEntity> findByCard_CardIdAndPaymentDateBetweenAndIsInstantPaymentFalse(Long cardId, LocalDateTime startDate, LocalDateTime endDate);

	@Transactional
    @Modifying
    @Query("UPDATE PaymentEntity p SET p.isInstantPayment = true WHERE p.card.cardId = :cardId AND p.paymentDate BETWEEN :startDate AND :endDate")
    int updatePaymentStatusToTrue(@Param("cardId") Long cardId, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
	
    // 상점 이름과 함께 모든 결제 내역 가져오기
    @Query("SELECT new com.urcarcher.be.kimyuri.PaymentDTO(p.paymentId, p.paymentPrice, p.paymentDate,  p.card.cardId, s.storeId, s.storeName, s.categoryCode) " +
           "FROM PaymentEntity p JOIN p.store s")
    List<PaymentDTO> findAllPaymentsWithStoreName();
    
    // 특정 카드 ID의 가장 최근 결제 내역 가져오기
    Optional<PaymentEntity> findTopByCardCardIdOrderByPaymentDateDesc(Long cardId);

    // 특정 memberId로 결제 내역 가져오기
    @Query("SELECT new com.urcarcher.be.kimyuri.PaymentDTO(p.paymentId, p.paymentPrice, p.paymentDate, p.card.cardId, s.storeId, s.storeName, s.categoryCode) " +
           "FROM PaymentEntity p JOIN p.store s " +
           "WHERE p.card.member.memberId = :memberId")
    List<PaymentDTO> findAllPaymentsByMemberId(@Param("memberId") String memberId);
    
 	// 특정 카드 ID로 모든 결제 내역 가져오기
    List<PaymentEntity> findAllByCardCardId(Long cardId);
    
    @Transactional
    @Modifying
    @Query("DELETE FROM PaymentEntity p WHERE p.card.cardId = :cardId")
    void deleteByCardId(@Param("cardId") Long cardId);

}
