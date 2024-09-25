package com.urcarcher.be.rani;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.urcarcher.be.rani.VO.CertificationDTO;
import com.urcarcher.be.rani.VO.CourseCategoryEntity;
import com.urcarcher.be.rani.VO.CourseCertificationEntity;
import com.urcarcher.be.rani.VO.CourseDTO;
import com.urcarcher.be.rani.VO.PlaceDTO;
import com.urcarcher.be.rani.repository.CertificationRepository;
import com.urcarcher.be.rani.repository.CourseRepository;
import com.urcarcher.be.rani.repository.PlaceRepository;

@Service
public class CourseServiceImpl implements CourseService{

	@Autowired
	CourseRepository courseRepo;
	
	@Autowired
	PlaceRepository placeRepo;
	
	@Autowired
	CertificationRepository certifiRepo;
	
	@Override
	public List<CourseDTO> getCourseList(){
		List<CourseDTO> courseList = courseRepo.findAll().stream().map(c->entityToDTO(c))
				.collect(Collectors.toList());
		return courseList;
	}
	
	@Override
	public List<PlaceDTO> getPlaceList(String courseId){
		List<PlaceDTO> placeList = placeRepo.findByIdCourseId(courseId).stream().map(p->entityToDTO(p))
				.collect(Collectors.toList());
		return placeList;
	}

	@Override
	public List<CertificationDTO> getCertification(String userId) {
		List<CertificationDTO> certificationList = certifiRepo.findByMemberId(userId).stream().map(c->entityToDTO(c))
				.collect(Collectors.toList());
		return certificationList;
	}

	@Override
	public void incrementViewCount(String courseId) {
		
		courseRepo.findById(courseId).ifPresent(course ->{
			course.setViewCount(course.getViewCount() + 1);
	        courseRepo.save(course); 
	        
	    });
		
	}

	@Override
	public void saveCertification(CourseCertificationEntity entity) {
		certifiRepo.save(entity);
		
	}
	
	
}
