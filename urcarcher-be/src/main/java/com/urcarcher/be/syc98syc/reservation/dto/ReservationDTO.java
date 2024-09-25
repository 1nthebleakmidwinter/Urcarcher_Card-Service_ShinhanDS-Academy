package com.urcarcher.be.syc98syc.reservation.dto;

import java.sql.Date;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
	private Integer reservationId;
	private Integer peopleNum;
	private Date reservationDate;
	private LocalTime reservationTime;
	private Integer state;
	private String location;
	private Integer classification;
	private String name;
	private Integer price;
	private String seat;
	
	private String memberId;

}
