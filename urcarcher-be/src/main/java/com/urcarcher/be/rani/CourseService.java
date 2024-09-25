package com.urcarcher.be.rani;

import java.time.LocalDateTime;
import java.util.List;

import com.urcarcher.be.rani.VO.CertificationDTO;
import com.urcarcher.be.rani.VO.CourseCategoryEntity;
import com.urcarcher.be.rani.VO.CourseCertificationEntity;
import com.urcarcher.be.rani.VO.CourseDTO;
import com.urcarcher.be.rani.VO.PlaceDTO;
import com.urcarcher.be.rani.VO.TravelCourseEntity;

public interface CourseService {

	
	List<CourseDTO> getCourseList();
	List<PlaceDTO> getPlaceList(String courseId);
	List<CertificationDTO> getCertification(String userId);
	void incrementViewCount(String courseId);
	void saveCertification(CourseCertificationEntity entity);
	
	//DTO -> Entity 
	default CourseCertificationEntity dtoToEntity (CertificationDTO dto) {
		CourseCertificationEntity entity = CourseCertificationEntity.builder()
				.certificationId(dto.getMemberId() + "-" + dto.getPlaceId())
				.memberId(dto.getMemberId())
				.placeId(dto.getPlaceId())
				.courseId(dto.getCourseId())
				.build();
		return entity;
		
	}
	
	//Entity -> DTO 
	default CourseDTO entityToDTO(CourseCategoryEntity entity) {
		CourseDTO dto = CourseDTO.builder()
				.courseId(entity.getCourseId())
				.courseName(entity.getCourseName())
				.region(entity.getRegion())
				.courseImg(entity.getCourseImg())
				.viewCount(entity.getViewCount())
				.authCount(entity.getAuthCount())
				.build();
		return dto;
	}
	
	default PlaceDTO entityToDTO (TravelCourseEntity entity) {
		PlaceDTO dto = PlaceDTO.builder()
				.placeId(entity.getId().getPlaceId())
				.placeName(entity.getPlaceName())
				.address(entity.getAddress())
				.latitude(entity.getLatitude())
				.longitude(entity.getLongitude())
				.content(entity.getContent())
				.detailContent(entity.getDetailContent())
				.placeImg(entity.getPlaceImg())
				.build();
		return dto;
	}
	
	default CertificationDTO entityToDTO (CourseCertificationEntity entity) {
		CertificationDTO dto = CertificationDTO.builder()
				.certificationId(entity.getCertificationId())
				.courseId(entity.getCourseId())
				.placeId(entity.getPlaceId())
				.memberId(entity.getMemberId())
				.certificationDate(entity.getCertificationDate())
				.build();
		return dto;
	}
	
	
	
	
}
