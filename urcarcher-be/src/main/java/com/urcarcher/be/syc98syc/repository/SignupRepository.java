package com.urcarcher.be.syc98syc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.urcarcher.be.blkwntr.entity.Member;

public interface SignupRepository extends JpaRepository<Member, String>{
	// ID로 회원을 조회하는 메서드
    boolean existsByMemberId(String memberId);
}
