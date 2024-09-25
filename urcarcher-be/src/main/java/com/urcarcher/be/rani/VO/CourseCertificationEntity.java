package com.urcarcher.be.rani.VO;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
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
@Table(name="course_certification")
public class CourseCertificationEntity {
	
	@Id
	@Column (name="certification_id",length = 50)
	private String certificationId;
	
	@Column (name="member_id")
	private String memberId;
	
	@Column (name="place_id",length = 20)
	private String placeId;
	
	@Column (name="course_id",length = 20)
	private String courseId;
	
	@CreationTimestamp
	@Column (name="certification_date", nullable = false)
	private Date certificationDate;	
	
	@ManyToOne
    @JoinColumns({
        @JoinColumn(name = "place_id", referencedColumnName = "place_id", insertable = false, updatable = false),
        @JoinColumn(name = "course_id", referencedColumnName = "course_id", insertable = false, updatable = false)
    })
    private TravelCourseEntity travelCourse;
	

}
