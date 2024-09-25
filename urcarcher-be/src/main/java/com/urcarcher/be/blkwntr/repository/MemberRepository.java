package com.urcarcher.be.blkwntr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.urcarcher.be.blkwntr.auth.MemberProvider;
import com.urcarcher.be.blkwntr.entity.Member;



public interface MemberRepository extends JpaRepository<Member, String> {
	Optional<Member> findByEmailAndProvider(String email, MemberProvider provider);
	
	Optional<PointMapping> findPointByMemberId(String memberId);
}
