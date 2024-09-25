package com.urcarcher.be.syc98syc.reservation.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.urcarcher.be.blkwntr.entity.Member;
import com.urcarcher.be.blkwntr.repository.MemberRepository;
import com.urcarcher.be.syc98syc.entity.ReservationEntity;
import com.urcarcher.be.syc98syc.repository.ReservationRepository;
import com.urcarcher.be.syc98syc.reservation.dto.ReservationDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService{

	private final ReservationRepository rRepo;
	private final MemberRepository mRepo;

	@Override
	public void create(ReservationDTO dto) {
		Member member = mRepo.findById(dto.getMemberId()).orElseThrow(() -> new RuntimeException("Member not found"));
		ReservationEntity entity = dtoToEntity(dto, member);
		rRepo.save(entity);
	}

	@Override
	public List<ReservationDTO> readMyReservation1(String memberId) {
		List<ReservationEntity> entityList = (List<ReservationEntity>) rRepo.findList1ByMemberId(memberId);
		
		List<ReservationDTO> dtoList = entityList.stream().map(entity->entityToDTO(entity))
				.collect(Collectors.toList());
		return dtoList;
	}
	

	@Override
	public void delete(ReservationDTO dto) {
		rRepo.findById(dto.getReservationId()).ifPresent(reservation -> {
			reservation.setState(0);
			rRepo.save(reservation);
		});
	}

	@Override
	public ReservationDTO readMyReservation1Detail(String reservationId) {
		Optional<ReservationEntity> entityOptional = rRepo.findById(Integer.parseInt(reservationId));
		return entityOptional.map(entity-> entityToDTO(entity)).orElse(null);
	}

}
