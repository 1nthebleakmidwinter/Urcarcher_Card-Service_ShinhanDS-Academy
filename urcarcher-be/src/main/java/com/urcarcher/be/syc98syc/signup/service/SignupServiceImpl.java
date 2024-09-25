package com.urcarcher.be.syc98syc.signup.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.urcarcher.be.blkwntr.entity.Member;
//import com.urcarcher.be.syc98syc.entity.MemberTest;
import com.urcarcher.be.syc98syc.repository.SignupRepository;
import com.urcarcher.be.syc98syc.signup.dto.MemberDTO;

@Service
public class SignupServiceImpl implements SignupService{
	@Autowired
	SignupRepository sRepo;

	@Override
	public String signupLocalMember(MemberDTO dto) {
		System.out.println(dto);
		Member entity = dtoToEntity(dto);
		System.out.println(entity);
		Member newMember = sRepo.save(entity);
		return newMember.getMemberId() + "회원가입 성공!";
	}

	@Override
	public boolean idDupCheck(String memId) {
		return sRepo.existsByMemberId(memId);
	}

}
