package com.urcarcher.be.syc98syc.reservation;

import com.urcarcher.be.syc98syc.entity.ReservationEntity;
import com.urcarcher.be.syc98syc.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationScheduler {

    @Autowired
    private ReservationRepository reservationRepository;

    @Scheduled(cron = "0 */1 * * * ?") // 매 1분마다 실행
    public void updateReservationState() {
    	LocalDate today = LocalDate.now();
        Date todayDate = Date.valueOf(today);

        // 예약 날짜가 오늘 이전이고 상태가 1인 예약을 찾음
        List<ReservationEntity> pastReservations = reservationRepository.findByReservationDateBeforeAndState(todayDate, 1);

        // 상태를 2로 업데이트
        for (ReservationEntity reservation : pastReservations) {
            reservation.setState(2);
            reservationRepository.save(reservation);
        }
    }
}
