package com.urcarcher.be.kimyuri;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.PostConstruct;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
public class SMSController {

    // CoolSMS API를 사용하여 메시지를 발송하기 위한 서비스 객체
	private DefaultMessageService messageService;
	
    // 사용자의 전화번호와 해당 번호로 발송된 인증번호를 저장하는 맵
	private Map<String, String> verificationCodes = new HashMap<>(); 

	@Value("${coolsms.api.key}")
	private String apiKey;

	@Value("${coolsms.api.secret}")
	private String apiSecret;

	@Value("${coolsms.api.number}")
	private String fromNumber;

    // 의존성 주입이 완료된 후 messageService를 초기화하는 메서드
	@PostConstruct
	public void init() {
		this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
	}

	/**
	 * 단일 메시지 발송
	 * 사용자가 입력한 전화번호로 인증번호를 생성하여 전송하는 메서드
	 */
	@PostMapping("/send-one")
	public SingleMessageSentResponse sendOne(@RequestBody SMSRequest smsRequest) {
		String phoneNumber = smsRequest.getPhoneNumber(); // 사용자가 입력한 전화번호
		String verificationCode = generateVerificationCode(); // 랜덤 6자리 인증번호 생성
		verificationCodes.put(phoneNumber, verificationCode); // 전화번호와 인증번호를 맵에 저장

        // 메시지 객체 생성 및 설정
		Message message = new Message();
		message.setFrom(fromNumber); // 발신 번호 설정
		message.setTo(phoneNumber); // 수신 번호 설정
		message.setText("인증번호는 " + verificationCode + "입니다."); // 메시지 내용 설정

        // 메시지 전송 및 응답 반환
		SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
		System.out.println(response);

		return response;
	}

	/**
	 * 인증번호 확인
	 * 사용자가 입력한 인증번호가 발송된 인증번호와 일치하는지 확인하는 메서드
	 */
	@PostMapping("/verify-code")
	public boolean verifyCode(@RequestBody VerificationRequest verificationRequest) {
		// 저장된 인증번호와 사용자가 입력한 인증번호를 비교
		String sentCode = verificationCodes.get(verificationRequest.getPhoneNumber());
		return verificationRequest.getVerificationCode().equals(sentCode); // 일치하면 true 반환
	}

	// 랜덤으로 6자리 인증번호를 생성하는 메서드
	private String generateVerificationCode() {
		Random random = new Random();
		int code = 100000 + random.nextInt(900000); // 100000 ~ 999999 사이의 숫자를 생성
		return String.valueOf(code); // 문자열로 반환
	}
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class SMSRequest {
	private String phoneNumber; // 사용자가 입력한 전화번호를 저장
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class VerificationRequest {
	private String phoneNumber; // 인증번호가 발송된 전화번호
	private String verificationCode; // 사용자가 입력한 인증번호
}
