package com.urcarcher.be.rani.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.urcarcher.be.rani.VO.CourseCertificationEntity;



public interface CertificationRepository extends JpaRepository <CourseCertificationEntity, String>{

	
	List<CourseCertificationEntity> findByMemberId(String userId);
}
