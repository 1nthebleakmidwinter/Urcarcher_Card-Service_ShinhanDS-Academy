package com.urcarcher.be.rani.VO;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CourseDTO {

	String courseId;
	String courseName;
	String region;
	String courseImg;
	int viewCount;
	int authCount;
}
