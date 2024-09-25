package com.urcarcher.be.kimyuri;
import java.time.LocalDate;
import java.util.List;

import com.urcarcher.be.jjjh.entity.StoreEntity;

public interface PaymentService {
	
	void insert(PaymentDTO dto);
	
	List<PaymentDTO> readAll();
	
	PaymentDTO readById(Long paymentId);
	
	void delete(Long paymentId);
	
	PaymentDTO readBycardId(Long cardId);
	
	List<PaymentDTO> readBycardIdAll(Long cardId);
	
	Double detailPayment(Long cardId, String paymentDate);
	
	Boolean immediatePayment(Long cardId, String paymentDate);
	
	 // 새로운 메서드 추가
    List<PaymentDTO> findPaymentsByMemberId(String memberId);
    
    // 카드 ID로 결제 내역 삭제
    void deletePaymentsByCardId(Long cardId); 

    // 카드와 연관된 결제 내역 삭제 후 카드 삭제
    void deleteCardAndPayments(Long cardId); 
    
	// Entity -> DTO
	default PaymentDTO entityToDTO(PaymentEntity entity) {
		PaymentDTO dto = PaymentDTO.builder()
				.paymentId(entity.getPaymentId())
				.paymentPrice(entity.getPaymentPrice())
				.paymentDate(entity.getPaymentDate())
                .cardId(entity.getCard().getCardId())
                .storeId(entity.getStore().getStoreId())
				.storeName(entity.getStore().getStoreName())
				.categoryCode(entity.getStore().getCategoryCode())
				.build();
		return dto;
	}
	
	
	// DTO -> Entity
	default PaymentEntity dtoToEntity(PaymentDTO dto) {
		
		PaymentEntity entity = PaymentEntity.builder()
				.paymentId(dto.getPaymentId())
				.paymentPrice(dto.getPaymentPrice())
				.paymentDate(dto.getPaymentDate())
				.card(CardEntity.builder().cardId(dto.getCardId()).build())
				.store(StoreEntity.builder()
				        .storeId(dto.getStoreId())
				        .storeName(dto.getStoreName())
				        .categoryCode(dto.getCategoryCode())
				        .build())
	           
				.build();
		return entity;
	}

	
	
	
	
}