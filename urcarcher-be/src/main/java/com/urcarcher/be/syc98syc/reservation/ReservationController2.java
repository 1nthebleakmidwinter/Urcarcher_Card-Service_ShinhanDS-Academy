package com.urcarcher.be.syc98syc.reservation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.urcarcher.be.blkwntr.auth.service.VanillaAuthorizingService;
import com.urcarcher.be.blkwntr.entity.Member;
import com.urcarcher.be.syc98syc.entity.ReservationEntity;
import com.urcarcher.be.syc98syc.repository.ReservationRepository;
import com.urcarcher.be.syc98syc.reservation.dto.ReservationDTO;
import com.urcarcher.be.syc98syc.reservation.service.ReservationService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reserve")
public class ReservationController2 {
	
	private final VanillaAuthorizingService vanillaAuthorizingService;
	private final ReservationService rService;
	
//	@GetMapping("/getMember")
//	Member test(@AuthenticationPrincipal UserDetails userDetails) {
//		System.out.println(userDetails.getUsername());
//		return vanillaAuthorizingService.getMemberByAuth(userDetails);
//	}
	
	@PostMapping("/insert")
	String insert(@RequestBody ReservationDTO dto) {
		rService.create(dto);
		return "예약성공";
	}
	
	@GetMapping("/myReservation1/{memberId}")
	List<ReservationDTO> getMyReservation1(@PathVariable("memberId") String memberId){
		return rService.readMyReservation1(memberId);
	}
	
	@GetMapping("/myReservation1/detail/{reservationId}")
	ReservationDTO getMyReservation1Detail(@PathVariable("reservationId") String reservationId){
		return rService.readMyReservation1Detail(reservationId);
	}
	
	@PutMapping("/delete")
	String delete(@RequestBody ReservationDTO dto) {
		rService.delete(dto);
		return "예약취소";
	}


}
