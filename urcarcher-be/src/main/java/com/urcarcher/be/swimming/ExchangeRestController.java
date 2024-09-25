package com.urcarcher.be.swimming;

import java.text.NumberFormat;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.urcarcher.be.blkwntr.exrate.ExchangeType;
import com.urcarcher.be.blkwntr.repository.MemberRepository;
import com.urcarcher.be.swimming.dto.ExchangeCardDTO;
import com.urcarcher.be.swimming.dto.ExchangeInfoDTO;
import com.urcarcher.be.swimming.dto.ExchangeMemberDTO;
import com.urcarcher.be.swimming.dto.ExchangeSetDTO;
import com.urcarcher.be.swimming.service.ExchangeService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/exchange")
public class ExchangeRestController {
	private final ExchangeService exService;
	private final MemberRepository memberRepository;
	
	// 로그인 유저 국적 조회
	@GetMapping("/find")
	public ExchangeType findMember(@AuthenticationPrincipal UserDetails userDetails) {
		return Arrays
					.stream(ExchangeType.values())
					.filter(exType -> exType
										.name()
										.substring(0, 2)
										.equals(memberRepository
												.findById(userDetails.getUsername())
												.get()
												.getNationality()))
					.findFirst()
					.get();
	}
	
	// 카드 리스트 조회
	@GetMapping("/list")
	public List<ExchangeCardDTO> getList(@AuthenticationPrincipal UserDetails userDetails) {
		String memberId = userDetails.getUsername();

		return exService.getList(memberId);
	}

	// 바로 환전
	@PostMapping("/insert")
	public String exchangeInsert(@RequestBody ExchangeInfoDTO infoDto, @AuthenticationPrincipal UserDetails userDetails) {
		String memberId = userDetails.getUsername();
		Long currency = infoDto.getExCur();

		exService.exchangeInsert(infoDto, memberId);

        // KRW 형식으로 변환
        NumberFormat krwFormat = NumberFormat.getCurrencyInstance(Locale.KOREA);
        String formatAmount = krwFormat.format(currency);

		return "KRW " + formatAmount;
	}
	
	// 예약 내역 조회
	@GetMapping("/rate/detail/{cardId}")
	public ExchangeSetDTO setDetail(@PathVariable("cardId") Long cardId, @AuthenticationPrincipal UserDetails userDetails) {
		String memberId = userDetails.getUsername();
		
		return exService.setDetail(cardId, memberId);
	}
	
	// 예약 환전
	@PostMapping("/rate/insert")
	public void setInsert(@RequestBody ExchangeSetDTO setDto, @AuthenticationPrincipal UserDetails userDetails) {
		String memberId = userDetails.getUsername();
		
		// System.out.println("******************** 예약일 확인 : " + setDto.getSetDate());
		exService.setInsert(setDto, memberId);
	}
	
	// 예약 내역 삭제
	@DeleteMapping("/rate/delete/{setId}")
	public void setDelete(@PathVariable("setId") Long setId) {
		exService.setDelete(setId);
	}
	
	// 환전 내역 전체 조회
	@GetMapping("/list/{cardId}")
	public List<ExchangeInfoDTO> infoList(@PathVariable("cardId") Long cardId, @AuthenticationPrincipal UserDetails userDetails) {
		String memberId = userDetails.getUsername();
		
		return exService.infoList(cardId, memberId);
	}
	
	// 환전 내역 상세 조회
	@GetMapping("/detail/{exId}")
	public ExchangeInfoDTO infoDetail(@PathVariable("exId") Long exId) {
		return exService.infoDetail(exId);
	}
}