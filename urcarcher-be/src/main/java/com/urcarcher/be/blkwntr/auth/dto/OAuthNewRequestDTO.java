package com.urcarcher.be.blkwntr.auth.dto;

import lombok.Data;

@Data
public class OAuthNewRequestDTO {
	private String email;
	private String registrationNumber;
	private String gender;
	private String nationality;
	private String phoneNumber;
	private String informationConsent;
	private String locationConsent;
	private String matchingConsent;
	private String provider;
	private String dateOfBirth;
}
