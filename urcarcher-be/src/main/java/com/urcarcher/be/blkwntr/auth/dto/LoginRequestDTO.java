package com.urcarcher.be.blkwntr.auth.dto;

import lombok.Data;

@Data
public class LoginRequestDTO {
	private String memberId;
	private String password;
	private String agree;
}
