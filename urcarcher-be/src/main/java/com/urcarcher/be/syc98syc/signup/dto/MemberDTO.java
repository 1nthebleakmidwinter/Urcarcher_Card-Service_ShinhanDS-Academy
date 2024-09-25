package com.urcarcher.be.syc98syc.signup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDTO {
	private String memberId;
	private String dateOfBirth;
	private String registrationNumber;
	private String email;
	private String gender;
	private String informationConsent;
	private String locationConsent;
	private String matchingConsent;
	private String name;
	private String nationality;
	private String passportNumber;
	private String password;
	private String phoneNumber;
	private String point;
	private String registrationDate;
	private String role;
	private String provider;
	private String picture;
}



