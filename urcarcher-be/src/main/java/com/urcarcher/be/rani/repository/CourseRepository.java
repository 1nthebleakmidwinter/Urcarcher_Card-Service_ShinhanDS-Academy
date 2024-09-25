package com.urcarcher.be.rani.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.urcarcher.be.rani.VO.CourseCategoryEntity;
import com.urcarcher.be.rani.VO.TravelCourseEntity;

public interface CourseRepository extends JpaRepository<CourseCategoryEntity, String>{
	
	
}
