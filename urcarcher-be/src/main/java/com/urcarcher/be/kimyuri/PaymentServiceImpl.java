package com.urcarcher.be.kimyuri;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

	final PaymentRepository paymentRepo;
	final CardRepository cardRepo;  // 카드 삭제를 위해 CardRepository 주입

	@Override
	public void insert(PaymentDTO dto) {
		PaymentEntity entity = dtoToEntity(dto);
		paymentRepo.save(entity);
	}

	@Override
	public List<PaymentDTO> readAll() {
		List<PaymentEntity> entityList = (List<PaymentEntity>) paymentRepo.findAll();

		List<PaymentDTO> dtoList = entityList.stream().map(entity -> entityToDTO(entity)).collect(Collectors.toList());
		return dtoList;

//		  기존 findAll() 대신 findAllPaymentsWithStoreName() 사용
//        return paymentRepo.findAllPaymentsWithStoreName();
	}

	@Override
	public PaymentDTO readById(Long paymentId) {
		PaymentEntity entity = paymentRepo.findById(paymentId).orElse(null);
		return entity != null ? entityToDTO(entity) : null;
	}

	@Override
	public PaymentDTO readBycardId(Long cardId) {
		// 가장 최근 결제 내역을 Optional로 받아오기
		Optional<PaymentEntity> entityOptional = paymentRepo.findTopByCardCardIdOrderByPaymentDateDesc(cardId);

		// Optional이 비어있지 않으면, PaymentEntity를 PaymentDTO로 변환
		return entityOptional.map(entity -> entityToDTO(entity)).orElse(null);
	}
	
	@Override
	public List<PaymentDTO> readBycardIdAll(Long cardId) {
		List<PaymentEntity> entities = paymentRepo.findAllByCardCardId(cardId);

	    return entities.stream().map(entity -> entityToDTO(entity)).collect(Collectors.toList());
	}
	
	@Override
    public Double detailPayment(Long cardId, String paymentDate) {
        try {
            // String을 LocalDate로 변환 (날짜 형식이 "yyyy-MM-dd"인 경우)
            LocalDate convertPaymentDate = LocalDate.parse(paymentDate, DateTimeFormatter.ISO_LOCAL_DATE);
            
            // LocalDate를 LocalDateTime으로 변환 (시간은 00:00:00으로 설정)
            LocalDateTime startOfDay = convertPaymentDate.atStartOfDay();
            
            // 현재 날짜에서 한 달 전의 날짜를 계산
            LocalDateTime oneMonthAgo = startOfDay.minusMonths(1);

            // 한 달 전부터 지정된 날짜까지의 결제 금액을 합산
            Double totalPayment = paymentRepo.findByCard_CardIdAndPaymentDateBetweenAndIsInstantPaymentFalse(cardId, oneMonthAgo, startOfDay)
                                             .stream()
                                             .mapToDouble(PaymentEntity::getPaymentPrice)
                                             .sum();
            return totalPayment;

        } catch (DateTimeParseException e) {
            // 날짜 형식이 잘못된 경우 처리
            throw new IllegalArgumentException("잘못된 날짜 형식: " + paymentDate, e);
        }
    }
	
	
	@Override
	public Boolean immediatePayment(Long cardId, String paymentDate) {
	    try {
	        // String을 LocalDate로 변환 (날짜 형식이 "yyyy-MM-dd"인 경우)
	        LocalDate convertPaymentDate = LocalDate.parse(paymentDate, DateTimeFormatter.ISO_LOCAL_DATE);
	        
	        // LocalDate를 LocalDateTime으로 변환 (시간은 00:00:00으로 설정)
	        LocalDateTime startOfDay = convertPaymentDate.atStartOfDay();
	        
	        // 현재 날짜와 시간을 가져옴
	        LocalDateTime now = LocalDateTime.now();
	        
	        // 현재 날짜에서 한 달 전의 날짜를 계산
	        LocalDateTime oneMonthAgo = startOfDay.minusMonths(1);

	        // 직접 업데이트 쿼리 호출
	        int updatedRows = paymentRepo.updatePaymentStatusToTrue(cardId, oneMonthAgo, now);

	        // 업데이트된 행 수에 따라 true 또는 false 반환
	        return updatedRows > 0;

	    } catch (DateTimeParseException e) {
	        // 날짜 형식이 잘못된 경우 처리
	        throw new IllegalArgumentException("잘못된 날짜 형식: " + paymentDate, e);
	    }
	}
	
	
	

	@Override
	public List<PaymentDTO> findPaymentsByMemberId(String memberId) {
		List<PaymentDTO> payments = paymentRepo.findAllPaymentsByMemberId(memberId);
		return payments;
	}

	  @Override
	    public void delete(Long paymentId) {
	        paymentRepo.deleteById(paymentId);
	    }

	    @Override
	    @Transactional
	    public void deletePaymentsByCardId(Long cardId) {
	        paymentRepo.deleteByCardId(cardId);
	    }

	    @Override
	    @Transactional
	    public void deleteCardAndPayments(Long cardId) {
	        deletePaymentsByCardId(cardId);
	        cardRepo.deleteById(cardId);
	    }
	

}
