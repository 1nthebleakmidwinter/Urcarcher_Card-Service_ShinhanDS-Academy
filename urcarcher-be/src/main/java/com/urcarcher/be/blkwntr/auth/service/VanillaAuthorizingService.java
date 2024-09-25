package com.urcarcher.be.blkwntr.auth.service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.urcarcher.be.blkwntr.auth.AuthorizedUser;
import com.urcarcher.be.blkwntr.auth.MemberRole;
import com.urcarcher.be.blkwntr.auth.dto.TokenDTO;
import com.urcarcher.be.blkwntr.auth.jwt.JwtCookieProvider;
import com.urcarcher.be.blkwntr.auth.jwt.JwtTokenProvider;
import com.urcarcher.be.blkwntr.entity.Member;
import com.urcarcher.be.blkwntr.repository.MemberRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VanillaAuthorizingService implements UserDetailsService {

	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final JwtTokenProvider jwtTokenProvider;
	
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public AuthorizedUser loadUserByUsername(String username) throws UsernameNotFoundException {
		return memberRepository.findById(username)
				.map(this::createUserDetails)
				.orElseThrow(()-> new UsernameNotFoundException("존재하지 않는 회원입니다."));
	}	
	
	private AuthorizedUser createUserDetails(Member member) {
		return AuthorizedUser.builder()
				.member(member)
				.build();
	}
	
	public Member InsertAfterEncodingPw(Member member) {
		String password = passwordEncoder.encode(member.getPassword());
		member.setPassword(password);
		return memberRepository.save(member);
	}
	
	@Transactional
	public TokenDTO loginChk(String memberId, String password) {
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberId, password);
		
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

		TokenDTO tokenDTO = jwtTokenProvider.generateToken(authentication);
		
		return tokenDTO;
	}

	public Member getMemberByAuth(UserDetails userDetails) {
		if(userDetails != null) return memberRepository
										.findById(userDetails.getUsername())
										.orElseThrow();
		return Member.builder()
				.role(MemberRole.GUEST)
				.build();
	}
	
}