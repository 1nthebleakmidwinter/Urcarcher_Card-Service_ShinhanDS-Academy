package com.urcarcher.be.syc98syc.signup.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.urcarcher.be.blkwntr.auth.MemberProvider;
import com.urcarcher.be.blkwntr.auth.MemberRole;
import com.urcarcher.be.blkwntr.auth.controller.AuthorizingController;
import com.urcarcher.be.blkwntr.auth.service.VanillaAuthorizingService;
import com.urcarcher.be.blkwntr.entity.Member;
import com.urcarcher.be.syc98syc.reservation.service.MailService;
import com.urcarcher.be.syc98syc.signup.dto.MemberDTO;
import com.urcarcher.be.syc98syc.signup.service.SignupService;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/signup")
public class SignupController {
	
	private final SignupService sService;
	private final MailService mService;
	private final VanillaAuthorizingService vanillaAuthorizingService;
	
//	@PostMapping("/local")
//	public void signupForm(@RequestBody MemberDTO dto) {
//		System.out.println(dto);
//		sService.signupLocalMember(dto);
//	}
	@PostMapping("/local")
	public ResponseEntity<Member> signup(@RequestBody Member member) {
		member.setRole(MemberRole.USER);
		member.setPoint(0);
		member.setProvider(MemberProvider.URCARCHER);
		Member newMember = vanillaAuthorizingService.InsertAfterEncodingPw(member);
		return ResponseEntity.ok(newMember);
	}
	
	@GetMapping("/idDupCheck")
	public ResponseEntity<?> idDupCheck(@RequestParam("memberId") String memId) {
		boolean exists = sService.idDupCheck(memId);
		return ResponseEntity.ok().body(exists);
	}
	
	@GetMapping("/sendMail.do")
	@ResponseBody
	public ResponseEntity<?> sendMail(@RequestParam("email") String email, HttpServletResponse response) throws MessagingException {
		// 이전에 설정된 쿠키를 삭제합니다.
	    Cookie oldCookie = new Cookie("eCode", null);
	    oldCookie.setPath("/");
	    oldCookie.setMaxAge(0);
	    response.addCookie(oldCookie);

	    // 새로운 인증 코드를 생성합니다.
	    int eCode = (int)(Math.random() * (900000)) + 100000;
	    
	    // 인증 코드를 쿠키에 저장합니다.
	    Cookie cookie = new Cookie("eCode", String.valueOf(eCode));
	    cookie.setPath("/");
	    cookie.setHttpOnly(true);
	    cookie.setMaxAge(60 * 30); // 30분
	    response.addCookie(cookie);

	    System.out.println(eCode);
//	    mService.sendMail(email, "URCARCHER- 회원가입 인증번호 안내", "안녕하세요. 어카처팀입니다.", eCode);

    	mService.sendEmail(email, "어카처 회원가입 인증 코드 전송", eCode);
	    System.out.println("메일 전송 완료");
	    return ResponseEntity.ok("메일 전송 완료");
	}
	
	@GetMapping("/checkMail.do")
	public void mailCheck(@RequestParam("emailCode") String emailCode,  HttpServletRequest request, HttpServletResponse response) throws IOException {
		// 쿠키에서 인증 코드를 읽어옵니다.
	    Cookie[] cookies = request.getCookies();
	    String val = null;
	    if (cookies != null) {
	        for (Cookie cookie : cookies) {
	            if ("eCode".equals(cookie.getName())) {
	                val = cookie.getValue();
	                break;
	            }
	        }
	    }

	    System.out.println(emailCode);
	    System.out.println(val);
	    String message = "0";
	    if (emailCode.equals(val)) {
	        message = "1";
	    }
	    response.getWriter().append(message);
	}
	
//	 @PostMapping("/send-email")
//	    public String sendEmail(@RequestParam String to, @RequestParam String name) {
//	        try {
//	        	mService.sendEmail(to, "Welcome Email", name);
//	            return "Email sent successfully";
//	        } catch (Exception e) {
//	            return "Failed to send email: " + e.getMessage();
//	        }
//	    }

}