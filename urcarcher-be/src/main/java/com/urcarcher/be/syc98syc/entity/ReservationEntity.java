package com.urcarcher.be.syc98syc.entity;

import java.sql.Date;
import java.time.LocalTime;

import com.urcarcher.be.blkwntr.entity.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="RESERVATION")
@EntityListeners(ReservationEntityListener.class)
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer reservationId;
	
	@Column(length = 100, nullable = false)
	private Integer peopleNum;
	
	@Column(length = 100)
	private Date reservationDate;
	
	@Column
	private LocalTime reservationTime; // LocalTime추가
	
	@Column(length = 2)
	private Integer state;
	
	@Column
	private Integer price;
	
	@Column(length = 200)
	private String location;
	
	@Column(length = 200)
	private String name;
	
	@Column(length = 100)
	private String seat;
	
	@Column(length = 2)
	private Integer classification;
	
	@ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
	Member member;
}
