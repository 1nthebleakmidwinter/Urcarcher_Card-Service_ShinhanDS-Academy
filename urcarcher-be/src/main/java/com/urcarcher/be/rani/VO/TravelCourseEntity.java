package com.urcarcher.be.rani.VO;

import java.math.BigDecimal;

import org.springframework.boot.autoconfigure.domain.EntityScan;

import com.urcarcher.be.rani.TravelCourseId;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
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
@Table(name="travel_course")
public class TravelCourseEntity {
	
	@EmbeddedId
    private TravelCourseId id;
	
	@Column(name = "place_name", nullable = false,length = 30)
	private String placeName;
	
	@Column(name = "address", nullable = false,length = 40)
	private String address;
	
	@Column(name = "latitude", precision=20, scale=6)
	private BigDecimal latitude;
	
	@Column(name = "longitude",precision=20, scale=6)
	private BigDecimal longitude;
	
	@Column(name = "content")
	private String content;
	
	@Column(name = "detail_content",length =500)
	private String detailContent;
	
	@Column(name = "place_img")
	private String placeImg;
	
	@ManyToOne
	@MapsId("courseId")
    @JoinColumn(name = "course_id", referencedColumnName = "course_id", insertable = false, updatable = false)
	private CourseCategoryEntity courseCategory;
	
	
}
