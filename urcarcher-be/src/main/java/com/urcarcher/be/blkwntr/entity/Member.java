package com.urcarcher.be.blkwntr.entity;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.urcarcher.be.blkwntr.auth.MemberProvider;
import com.urcarcher.be.blkwntr.auth.MemberRole;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="MEMBER")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Member {

	@Id
	private String memberId;
	private String password;
	
	private String name;
	private String email;
	private String dateOfBirth;
	private String registrationNumber;
	private String gender;
	private String nationality;
	private String passportNumber;
	private String phoneNumber;
	
	private String locationConsent;
	private String informationConsent;
	private String matchingConsent;
	
	private Integer point;
	private String picture;
	
	@CreationTimestamp
	private Timestamp registrationDate;
	
	
	
	
	@Enumerated(EnumType.STRING)
	private MemberRole role;

	@Enumerated(EnumType.STRING)
	private MemberProvider provider;
	
}
