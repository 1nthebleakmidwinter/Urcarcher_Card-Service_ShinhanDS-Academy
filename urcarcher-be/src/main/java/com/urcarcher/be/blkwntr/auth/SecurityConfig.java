package com.urcarcher.be.blkwntr.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.urcarcher.be.blkwntr.auth.jwt.JwtAuthenticationFilter;
import com.urcarcher.be.blkwntr.auth.jwt.JwtCookieProvider;
import com.urcarcher.be.blkwntr.auth.jwt.JwtTokenProvider;
import com.urcarcher.be.blkwntr.auth.service.UrcarcherOAuth2Service;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	
	private final JwtTokenProvider jwtTokenProvider;
	private final JwtCookieProvider jwtCookieProvider;
	
	private final UrcarcherOAuth2Service urcarcherOAuth2Service;
	private final OAuth2SuccessHandler oAuth2SuccessHandler;
	
	private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
	
	private static final String[] BLACK_LIST = {"/api/paymentPlace/**, /api/exchange/**, /api/reserve/**"};
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.httpBasic(basicConfig->
					basicConfig
						.disable()
				)
				.csrf(csrfConfig->
					csrfConfig
						.disable()
				)
				.formLogin(formLoginConfig->
					formLoginConfig
						.disable()
				)
				.sessionManagement(sessionConfig->
					sessionConfig
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				)
				.authorizeHttpRequests(authConfig->{
					authConfig
						.requestMatchers(BLACK_LIST).authenticated()
						.anyRequest().permitAll();
				})
				.oauth2Login(oauth2Config -> {
					oauth2Config
						.authorizationEndpoint(authEndPoint -> {
							authEndPoint.authorizationRequestRepository(httpCookieOAuth2AuthorizationRequestRepository);
						})
						.userInfoEndpoint(load->load.userService(urcarcherOAuth2Service))
						.successHandler(oAuth2SuccessHandler);
				})
				.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, jwtCookieProvider), UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}
}
