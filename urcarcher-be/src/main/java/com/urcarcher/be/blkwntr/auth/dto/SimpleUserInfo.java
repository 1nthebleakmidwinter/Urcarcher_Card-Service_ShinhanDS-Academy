package com.urcarcher.be.blkwntr.auth.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SimpleUserInfo {
	private Boolean isAuthorized;
	private String name;
	private String memberId;
}
