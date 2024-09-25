package com.urcarcher.be.syc98syc.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.urcarcher.be.syc98syc.entity.ReservationEntity;

public interface ReservationRepository extends JpaRepository<ReservationEntity, Integer>{
	// 특정 멤버의 모든 예약 정보를 조회
   // List<ReservationEntity> findAllByMemberId(String memberId);
	
//    @Query("SELECT r FROM ReservationEntity r WHERE r.member.memberId = :memberId")
//    List<ReservationEntity> findByMemberId(@Param("memberId") String memberId);
	
	@Query("SELECT r FROM ReservationEntity r " +
		       "WHERE r.member.memberId = :memberId " +
		       "ORDER BY " +
		       "CASE WHEN r.state = 1 THEN 1 " +
		       "     WHEN r.state = 2 THEN 2 " +
		       "     WHEN r.state = 0 THEN 3 " +
		       "     ELSE 4 END, " + // `state` 우선순위 정렬
		       "r.reservationDate ASC") // `reservationDate` 오름차순 정렬
	List<ReservationEntity> findList1ByMemberId(@Param("memberId") String memberId);
	
	// 예약 날짜가 오늘 이전이고, 상태가 1인 예약을 찾는 메서드
    List<ReservationEntity> findByReservationDateBeforeAndState(Date reservationDate, Integer state);
}
