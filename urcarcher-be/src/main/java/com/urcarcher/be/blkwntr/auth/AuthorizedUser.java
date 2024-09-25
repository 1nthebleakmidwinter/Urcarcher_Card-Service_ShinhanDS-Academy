package com.urcarcher.be.blkwntr.auth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.urcarcher.be.blkwntr.entity.Member;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthorizedUser implements UserDetails, OAuth2User {
	private static final long serialVersionUID = 1L;
	private static final String ROLE_PREFIX = "ROLE_";
	
	private Member member;
	private Map<String, Object> attributes;
	private String attributeName;

	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<SimpleGrantedAuthority> simpleGrantedAuthority = new ArrayList<>();
		simpleGrantedAuthority.add(new SimpleGrantedAuthority(ROLE_PREFIX + member.getRole().name()));
		return simpleGrantedAuthority;
	}

	@Override
	public String getName() {
		return attributes.get(attributeName).toString();
	}
	
	@Override
	public String getUsername() {
		return member.getMemberId();
	}

	@Override
	public String getPassword() {
		return member.getPassword();
	}
	
	@Override
    public boolean isAccountNonExpired() {
        return true;
    }
 
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
 
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
 
    @Override
    public boolean isEnabled() {
        return true;
    }
}
