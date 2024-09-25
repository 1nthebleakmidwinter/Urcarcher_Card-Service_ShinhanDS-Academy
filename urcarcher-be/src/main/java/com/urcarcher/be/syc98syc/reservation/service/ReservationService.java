package com.urcarcher.be.syc98syc.reservation.service;

import java.util.List;

import com.urcarcher.be.blkwntr.entity.Member;
import com.urcarcher.be.kimyuri.CardDTO;
import com.urcarcher.be.kimyuri.CardEntity;
import com.urcarcher.be.syc98syc.entity.ReservationEntity;
import com.urcarcher.be.syc98syc.reservation.dto.ReservationDTO;

public interface ReservationService {
	
	void create(ReservationDTO dto);
	
	List<ReservationDTO> readMyReservation1(String memberId);
	
	ReservationDTO readMyReservation1Detail(String reservationId);
	
	void delete(ReservationDTO dto);
	
	// Entity -> DTO
    default ReservationDTO entityToDTO(ReservationEntity entity) {
    	ReservationDTO dto = ReservationDTO.builder()
    			.reservationId(entity.getReservationId())
				.peopleNum(entity.getPeopleNum())
				.reservationDate(entity.getReservationDate())
				.reservationTime(entity.getReservationTime())
				.state(entity.getState())
				.location(entity.getLocation())
				.classification(entity.getClassification())
				.price(entity.getPrice())
				.name(entity.getName())
				.seat(entity.getSeat())
				.memberId(entity.getMember() != null ? entity.getMember().getMemberId() : null)
                .build();
        return dto;
    }
	
	// DTO -> Entity
		default ReservationEntity dtoToEntity(ReservationDTO dto, Member member) {
			
			ReservationEntity entity = ReservationEntity.builder()
					.reservationId(dto.getReservationId())
					.peopleNum(dto.getPeopleNum())
					.reservationDate(dto.getReservationDate())
					.reservationTime(dto.getReservationTime())
					.state(dto.getState())
					.location(dto.getLocation())
					.classification(dto.getClassification())
					.price(dto.getPrice())
					.name(dto.getName())
					.seat(dto.getSeat())
					.member(member)
					.build();
			return entity;
		}

}
