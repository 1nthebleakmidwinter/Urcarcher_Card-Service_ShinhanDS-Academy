package com.urcarcher.be.rani.VO;

import java.sql.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name="course_completion")
public class CourseCompletionEntity {
	
	@Id
	@Column(name="certification_id",length = 20)
	private String certificationId;
	
	@Column (name="course_id",length = 20)
	private String courseId;
	
	@Column(name="member_id")
	private String memberId;
	
	@Column(name="point_amount")
	private Integer pointAmount;
	
	@CreationTimestamp
	@Column(name="payment_date")
	private Date paymentDate;
	
	@ManyToOne
    @JoinColumn(name = "couse_id", insertable = false, updatable = false)
    private CourseCategoryEntity courseCategory;
}
