package com.urcarcher.be.kimyuri;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface CardRepository extends JpaRepository<CardEntity, Long>{
	
	
	@Modifying
    @Transactional
    @Query("DELETE FROM CardEntity c WHERE c.cardId = :cardId AND c.cardPassword = :password")
    int deleteByCardIdAndPassword(@Param("cardId") Long cardId, @Param("password") String password);
	
	@Modifying
	@Transactional
	@Query("UPDATE CardEntity c SET c.cardStatus = :isActive WHERE c.cardId = :cardId")
	int updateCardStatus(@Param("cardId") Long cardId, @Param("isActive") Boolean isActive);

	boolean existsByCardIdAndCardPassword(@Param("cardId") Long cardId, @Param("checkPinNumber")String checkPinNumber);
	
	@Modifying
	@Transactional
	@Query("UPDATE CardEntity c SET c.cardPassword = :pinNumber WHERE c.cardId = :cardId")
	int updateCardPassword(@Param("cardId") Long cardId, @Param("pinNumber") String pinNumber);
	
	@Modifying
	@Transactional
	@Query("UPDATE CardEntity c SET c.cardBalance = c.cardBalance + :cardBalance WHERE c.cardId = :cardId")
	int updateCardBalance(@Param("cardId") Long cardId, @Param("cardBalance") Double cardBalance);
	
	@Modifying
	@Transactional
	@Query("UPDATE CardEntity c SET c.cardBalance = c.cardBalance - :cardBalance WHERE c.cardId = :cardId")
	int subtractFromCardBalance(@Param("cardId") Long cardId, @Param("cardBalance") Double cardBalance);
	
	
    @Query("SELECT c FROM CardEntity c WHERE c.member.memberId = :memberId")
    List<CardEntity> findByMemberId(@Param("memberId") String memberId);
}
