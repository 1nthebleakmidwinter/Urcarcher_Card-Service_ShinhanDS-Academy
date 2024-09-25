package com.urcarcher.be.syc98syc.entity;

import com.urcarcher.be.syc98syc.entity.ReservationEntity;
import com.urcarcher.be.syc98syc.reservation.service.MailService;

import jakarta.mail.MessagingException;
import jakarta.persistence.PostPersist;

import java.sql.Date;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReservationEntityListener {

    private final MailService mailService;

    @Autowired
    public ReservationEntityListener(MailService mailService) {
        this.mailService = mailService;
    }
    @PostPersist
    public void onPostPersist(ReservationEntity reservation) {
        try {
            String to = reservation.getMember().getEmail();
            String subject = "예약 확인 이메일";
            //전달
            String memberName = reservation.getMember().getName();
            Date reservationDate = reservation.getReservationDate();
            LocalTime reservationTime = reservation.getReservationTime();
            String name = reservation.getName();
            String seat = reservation.getSeat();
            int people_num = reservation.getPeopleNum();
            String location = reservation.getLocation();
            mailService.sendReservationEmail(to, subject, memberName, reservationDate, reservationTime, name, seat, people_num, location);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
