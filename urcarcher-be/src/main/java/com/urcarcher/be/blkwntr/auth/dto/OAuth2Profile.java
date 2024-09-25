package com.urcarcher.be.blkwntr.auth.dto;

import java.util.Map;

import com.urcarcher.be.blkwntr.auth.MemberProvider;
import com.urcarcher.be.blkwntr.auth.MemberRole;
import com.urcarcher.be.blkwntr.entity.Member;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OAuth2Profile {
	private String sub;
	private String email;
	private String name;
	private String picture;
	private MemberProvider provider;
	
	public static OAuth2Profile of(String regisrationId, Map<String, Object> attributes, String attributeName) {
		return switch (regisrationId) {
			case "google" -> ofGoogle(attributes, attributeName);
			default -> OAuth2Profile.builder().build();
		};
	}
	
	private static OAuth2Profile ofGoogle(Map<String, Object> attributes, String attributeName) {
		return OAuth2Profile.builder()
				.sub((String) attributes.get(attributeName))
				.email((String) attributes.get("email"))
				.name((String) attributes.get("name"))
				.picture((String) attributes.get("picture"))
				.provider(MemberProvider.GOOGLE)
				.build();
	}
	
	public Member toMember() {
		return Member.builder()
				.memberId(sub)
				.email(email)
				.name(name)
				.picture(picture)
				.role(MemberRole.GUEST)
				.provider(provider)
				.build();
	}
}
