package com.urcarcher.be.rani.VO;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CertificationDTO {
	String certificationId;
	String memberId;
	String placeId;
	String courseId;
	Date certificationDate;	

}
