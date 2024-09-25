package com.urcarcher.be.rani.VO;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@ToString
@Entity
@Table(name="course_category")
public class CourseCategoryEntity {

	@Id
	@Column (name="course_id",length = 20)
	private String courseId;
	
	@Column (name="course_name",nullable = false,length = 40)
	private String courseName;
	
	@Column (name="course_count")
	private Integer courseCount;
	
	@Column (name="point_amount")
	private Integer pointAmount;
	
	@Column (name="course_img")
	private String courseImg;
	
	@Column (name="region",length = 5)
	private String region;
	
	@Column (name="view_count")
	private Integer viewCount;
	
	@Column (name="auth_count")
	private Integer authCount; 
	

	
	@OneToMany(mappedBy = "courseCategory")
    private List<TravelCourseEntity> travelCourses;
	
	@OneToMany(mappedBy = "courseCategory")
	private List<CourseCompletionEntity> courseCompletion;
	
	
}
