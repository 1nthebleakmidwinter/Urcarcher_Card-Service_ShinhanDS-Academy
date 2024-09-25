package com.urcarcher.be;

import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.urcarcher.be.kimyuri.CardEntity;


public interface HomeRepository extends CrudRepository<CardEntity, Long>{ //홈 화면 카드 정보
	
	
		
	// 회원이 소유한 카드들 중 첫 번째 카드를 기준으로 해당 카드의 이번 달 사용 금액 조회
	  @Query(value = "SELECT"
	  		+ "    c.card_id AS card_id,"
	  		+ "    c.card_account,"
	  		+ "    ct.card_name,"
	  		+ "    c.card_balance,"
	  		+ "    ct.card_usage,"
	  		+ "    c.expiration_date,"
	  		+ "    c.card_number,"
	  		+ "    m.name,"
	  		+ "    COALESCE(SUM(p.payment_price), 0) AS total_payment"
	  		+ " FROM"
	  		+ "    card c"
	  		+ " JOIN"
	  		+ "    card_type ct ON c.card_type_id = ct.card_type_id"
	  		+ " LEFT JOIN"
	  		+ "    payment p ON c.card_id = p.card_id"
	  		+ "    AND p.payment_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')"
	  		+ "    AND p.payment_date < DATE_ADD(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 1 MONTH)"
	  		+ " JOIN"
	  		+ "    member m ON c.member_id = m.member_id"
	  		+ " WHERE"
	  		+ "    c.member_id = ?1"
	  		+ " GROUP BY"
	  		+ "    c.card_id, c.card_account, c.card_balance, ct.card_name, ct.card_usage, c.expiration_date, c.card_number, m.name"
	  		+ " HAVING"
	  		+ "    c.card_id = ("
	  		+ "        SELECT MIN(c2.card_id)"
	  		+ "        FROM card c2"
	  		+ "        WHERE c2.member_id = ?1)",
	  		nativeQuery = true)
		Optional<Map<String,Object>> findCardDetailsWithTotalPayment(String memberId);
	
	 
}
