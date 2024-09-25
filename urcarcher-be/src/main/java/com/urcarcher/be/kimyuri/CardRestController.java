package com.urcarcher.be.kimyuri;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.urcarcher.be.blkwntr.entity.Member;
import com.urcarcher.be.blkwntr.repository.MemberRepository;
import com.urcarcher.be.syc98syc.signup.dto.MemberDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/card")
public class CardRestController {
	
	final CardService cardService;
	final PaymentService paymentService;  // PaymentService 추가

	
	@GetMapping("/list")
	List<CardDTO> list(){
		return cardService.readAll();
	}
	
	@GetMapping("/get/{cardId}")
	CardDTO read(@PathVariable("cardId") Long cardId) {
		return cardService.readById(cardId);
	}
	
	@PostMapping("/insert")
	String insert(@RequestBody CardDTO dto) {
		cardService.create(dto);
		return "카드 데이터가 성공적으로 저장되었습니다.";
	}

	
	@PutMapping("/update")
	String update(@RequestBody CardDTO dto) {
		cardService.update(dto);
		return "수정작업";
	}
	
	@DeleteMapping("/delete/{cardId}")
	String delete(@PathVariable("cardId") Long cardId) {
		cardService.delete(cardId);
		return "삭제작업";
	}
	
	
	// 카드관리 - 카드삭제 (비밀번호 확인 포함)
		@PostMapping("/deletecard")
		public ResponseEntity<String> deleteCardWithPassword(@RequestBody Map<String, String> requestBody) {
		    try {
		        boolean isPasswordValid = cardService.checkPinNumber(
		            Long.parseLong(requestBody.get("cardId")), 
		            requestBody.get("password")
		        );

		        if (!isPasswordValid) {
		            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호가 일치하지 않습니다.");
		        }

		        paymentService.deleteCardAndPayments(Long.parseLong(requestBody.get("cardId")));
		        return ResponseEntity.ok("카드와 관련된 모든 결제 내역이 성공적으로 삭제되었습니다.");

		    } catch (Exception e) {
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("카드 및 결제 내역 삭제에 실패했습니다.");
		    }
		}
	 
	 // 카드관리 - 카드 비활성화
	 @PostMapping("/cardstatus")
	 public ResponseEntity<String> toggleCardStatus(@RequestBody Map<String, String> requestBody) {
	        boolean isConvert = cardService.toggleCardStatus(Long.parseLong(requestBody.get("cardId")), Boolean.parseBoolean(requestBody.get("isActive")));
	        if (isConvert) {
	            return ResponseEntity.ok("카드가 성공적으로 삭제되었습니다.");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호가 일치하지 않거나 카드가 존재하지 않습니다.");
	        }
	 }
	
	 // 카드관리 - 카드 PIN번호 확인
	 @PostMapping("/checkpinnumber")
	 public ResponseEntity<String> checkPinNumber(@RequestBody Map<String, String> requestBody) {
	        boolean isCheck = cardService.checkPinNumber(Long.parseLong(requestBody.get("cardId")), (requestBody.get("pinNumber")));
	        if (isCheck) {
	            return ResponseEntity.ok("true");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("false");
	        }
	 }
	 
	 // 카드관리 - 카드 PIN번호 변경
	 @PostMapping("/changepinnumber")
	 public ResponseEntity<String> changePinNumber(@RequestBody Map<String, String> requestBody) {
		 boolean isCheck = cardService.changePinNumber(Long.parseLong(requestBody.get("cardId")), (requestBody.get("pinNumber")));
	        if (isCheck) {
	            return ResponseEntity.ok("true");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("false");
	        }
	 }
	 
	 // 카드관리 - 선불카드 잔액 충전
	 @PostMapping("/chargeamount")
	 public ResponseEntity<String> chargeAmount(@RequestBody Map<String, String> requestBody){
		 boolean isCheck = cardService.chargeAmount(Long.parseLong(requestBody.get("cardId")), Double.parseDouble((requestBody.get("cardBalance"))));
	        if (isCheck) {
	            return ResponseEntity.ok("true");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("false");
	        }
	 }
	 
	 
	 // 카드관리 - 카드 정보 불러오기
	 @GetMapping("/mycard/{memberId}")
	 public List<CardDTO> getMyCardInfo(@PathVariable("memberId") String memberId) {
		 List<CardDTO> result = cardService.getCardInfo(memberId);
		 return result;
	 }
	 
	 // 예약금 결제 - 선불카드 잔액 차감
	 @PostMapping("/usepayment")
	 public ResponseEntity<String> usePayment(@RequestBody Map<String, String> requestBody){
	     boolean isCheck = cardService.usePayment(
	         Long.parseLong(requestBody.get("cardId")),
	         Double.parseDouble(requestBody.get("cardBalance"))
	     );
	     if (isCheck) {
	         return ResponseEntity.ok("true");
	     } else {
	         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("false");
	     }
	 }
	 
	 
	
	// 카드 신청시 회원 기본 정보 불러오기(이름, 휴대전화번호, 주민번호)
//	 final MemberRepository memberRepository;
//
//    @GetMapping("/{memberId}")
//    public MemberDTO getMemberInfo(@PathVariable("memberId") String memberId) {
//        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("Member not found"));
//        return MemberDTO.builder()
//                .memberId(member.getMemberId())
//                .name(member.getName())
//                .phoneNumber(member.getPhoneNumber())
//                .registrationNumber(member.getRegistrationNumber())
//                .build();
//    }
    
    
}
