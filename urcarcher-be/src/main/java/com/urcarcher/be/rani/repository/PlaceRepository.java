package com.urcarcher.be.rani.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.urcarcher.be.rani.TravelCourseId;
import com.urcarcher.be.rani.VO.TravelCourseEntity;

public interface PlaceRepository extends JpaRepository<TravelCourseEntity, TravelCourseId>{
	List<TravelCourseEntity> findByIdCourseId(String courseId);
}
