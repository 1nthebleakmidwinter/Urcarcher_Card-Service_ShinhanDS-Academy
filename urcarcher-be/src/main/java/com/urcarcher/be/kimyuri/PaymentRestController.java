package com.urcarcher.be.kimyuri;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RestController
@CrossOrigin
@RequestMapping("/api/payment")
public class PaymentRestController {
	@Autowired
	private PaymentService paymentService;
	
	@GetMapping("/list")
	List<PaymentDTO> list() {
		return paymentService.readAll();
	}
	
	@GetMapping("/get/{paymentId}")
	PaymentDTO read(@PathVariable("paymentId") Long paymentId) {
		return paymentService.readById(paymentId);
	}
	
	@PostMapping("/insert")
	String insert(@RequestBody PaymentDTO dto) {
		paymentService.insert(dto);
		return "입력작업";
	}
	
	@DeleteMapping("/delete/{paymentId}")
	String delete(@PathVariable("paymentId") Long paymentId) {
		paymentService.delete(paymentId);
		return "삭제작업";
	}
	
	@DeleteMapping("/delete/{cardId}")
	public ResponseEntity<String> deleteCardAndPayments(@PathVariable("cardId") Long cardId) {
	    try {
	        paymentService.deleteCardAndPayments(cardId);
	        return ResponseEntity.ok("카드와 관련된 모든 결제 내역이 성공적으로 삭제되었습니다.");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("카드 및 결제 내역 삭제에 실패했습니다.");
	    }
	}
	
	// 카드관리 - 즉시결제
	@PostMapping("/immediatepayment")
	Boolean immediatePayment(@RequestBody Map<String, String> requestBody) {
		return paymentService.immediatePayment(Long.parseLong(requestBody.get("cardId")), requestBody.get("paymentDate"));
	}
	
	// 카드관리 - 결제내역
	@PostMapping("/detailpayment")
	Double detailPayment(@RequestBody Map<String, String> requestBody) {
		return paymentService.detailPayment(Long.parseLong(requestBody.get("cardId")), requestBody.get("paymentDate"));
	}
	
	// 카드 관리 - 최근 결제 내역 가져오기
	@PostMapping("/recentpayment")
	PaymentDTO readByCardId(@RequestBody Map<String, String> requestBody) {
		return paymentService.readBycardId(Long.parseLong(requestBody.get("cardId")));
	}
	
	// 예약금 결제
	@PostMapping("/depositpayment")
	void depositPayment(@RequestBody PaymentDTO dto) {
		paymentService.insert(dto);
	}
	@PostMapping("/by-member")
	public ResponseEntity<List<PaymentDTO>> getPaymentsByMemberId(@RequestBody Map<String, String> requestBody) {
	    String memberId = requestBody.get("memberId");
//	    System.out.println("Received memberId: " + memberId); // 로그 추가

	    List<PaymentDTO> payments = paymentService.findPaymentsByMemberId(memberId);
//	    System.out.println("Payments found: " + payments.size()); // 로그 추가

	    if (payments.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
	    }
	    return ResponseEntity.ok(payments);
	}
	
	@PostMapping("/paymenthistory")
	List<PaymentDTO> myPayment(@RequestBody Map<String, String> requestBody) {
		return paymentService.readBycardIdAll(Long.parseLong(requestBody.get("cardId")));
	}
}
