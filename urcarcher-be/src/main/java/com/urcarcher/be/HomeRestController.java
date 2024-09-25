package com.urcarcher.be;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.urcarcher.be.blkwntr.repository.MemberRepository;
import com.urcarcher.be.blkwntr.repository.PointMapping;

import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/api/home")
public class HomeRestController {

	@Autowired
	HomeService homeService;
	
	@Autowired
	MemberRepository memberRepository;

	@GetMapping("/my-main-card/{memberId}")
	public ResponseEntity<HomeCardDTO> getCardDetailsWithTotalPayment(@PathVariable("memberId") String memberId) {
		//System.out.println("memberId:" + memberId);
		HomeCardDTO card = homeService.getCardDetailsWithTotalPayment(memberId);
		card.setPoint(homeService.getMemberPoint(memberId));
		if (card != null) {
			return ResponseEntity.ok(card);
		} else {
			return ResponseEntity.notFound().build();
		}
		
	}


}
