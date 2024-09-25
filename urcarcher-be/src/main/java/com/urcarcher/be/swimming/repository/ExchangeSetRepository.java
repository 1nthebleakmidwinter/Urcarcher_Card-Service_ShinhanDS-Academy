package com.urcarcher.be.swimming.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.urcarcher.be.swimming.entity.ExchangeSetEntity;

public interface ExchangeSetRepository extends JpaRepository<ExchangeSetEntity, Long> {
	// 예약 내역 조회
	@Query("SELECT s FROM ExchangeSetEntity s"
			+ " JOIN CardEntity c on (s.card = c)"
			+ " WHERE c.cardId = ?1 AND s.setStatus = 'N'")
	ExchangeSetEntity findByCurSet(Long cardId);
	
	// 오늘 날짜와 같은 예약일 조회
	@Query("SELECT s FROM ExchangeSetEntity s"
			+ " WHERE s.setDate = ?1")
	List<ExchangeSetEntity> findDateSet(LocalDate today);
}