package com.urcarcher.be.jjjh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.urcarcher.be.jjjh.dto.StoreCategoryDTO;
import com.urcarcher.be.jjjh.dto.StoreDTO;
import com.urcarcher.be.jjjh.dto.StoreWithCountDTO;
import com.urcarcher.be.jjjh.entity.StoreEntity;

@Repository
public interface StoreRepository extends JpaRepository<StoreEntity, String> {

	//결제 내역 중 전체 카테고리 건수 내역 조회 (현재 날짜 이전 한 달까지)
	@Query(value = "SELECT s.category_code, s.category_name, COUNT(*) AS usage_count " +
            "FROM payment p " +
            "JOIN store s ON p.store_id = s.store_id " +
            "JOIN card c ON p.card_id = c.card_id " +
            "WHERE c.member_id = :memberId " +
            "AND p.payment_date BETWEEN NOW() - INTERVAL 1 MONTH AND NOW() " +
            "AND s.store_id != '11111111' " +
            "AND s.category_code IS NOT NULL " +
            "AND s.category_name IS NOT NULL " +
            "AND s.category_code != '' " +
            "AND s.category_name != '' " +
            "GROUP BY s.category_code, s.category_name " +
            "ORDER BY usage_count DESC", 
    nativeQuery = true)
	 List<Object[]> findMostUsedCategoriesByMemberId(@Param("memberId") String memberId);	
	 
	 //상위 3개 카테고리 정보 
	 @Query(value = """
		        SELECT 
				    category_code, 
				    category_name, 
				    usage_count
				FROM(
					SELECT 
				    	s.category_code, 
				    	s.category_name, 
				    	COUNT(*) AS usage_count,
					   RANK() OVER (ORDER BY COUNT(*) DESC, s.category_name ASC) AS rn
					FROM 
					    payment p
					JOIN 
					    store s ON p.store_id = s.store_id
					JOIN 
					    card c ON p.card_id = c.card_id
					WHERE 
					    c.member_id = ?1  
					    AND p.payment_date BETWEEN NOW() - INTERVAL 1 MONTH AND NOW()
					    AND s.store_id != '11111111' 
					    AND s.category_code IS NOT NULL  
				       AND s.category_name IS NOT NULL 
				       AND s.category_code != ' '
				       AND s.category_name != ' '
					GROUP BY 
					    s.category_code, 
					    s.category_name
				) AS  RankedCategories
				WHERE 
				    rn <= 3
				ORDER BY 
					 usage_count DESC, 
					 category_name ASC
		        """, nativeQuery = true)
	 List<Object[]> findTopCategoriesByMemberId(@Param("memberId") String memberId);
	 
	 //전체 회원의 결제 내역 중 총 결제 건수가 많은 가맹점 정보
     @Query(value = """
            SELECT 
                s.store_id AS storeId, 
                s.store_name AS storeName, 
                s.store_addr AS storeAddr, 
                s.store_road_addr AS storeRoadAddr, 
                s.store_phone AS storePhone, 
                s.store_url AS storeUrl, 
                s.store_x AS storeX, 
                s.store_y AS storeY, 
                s.category_code AS categoryCode, 
                s.category_name AS categoryName, 
                COUNT(p.payment_id) AS usageCount
            FROM 
                payment p
            JOIN 
                store s ON p.store_id = s.store_id
            JOIN 
                card c ON p.card_id = c.card_id
            WHERE 
                s.store_id != 11111111   
                AND YEAR(p.payment_date) = YEAR(CURDATE())  
     			AND p.payment_date < CURDATE()   
            GROUP BY 
                s.store_id, s.store_name, s.store_addr, s.store_road_addr, 
                s.store_phone, s.store_url, s.store_x, s.store_y, 
                s.category_code, s.category_name
            ORDER BY 
                usageCount DESC
            """, nativeQuery = true)
	 List<Object[]> findMostUsedStoresExcludingMember();


}
