package com.urcarcher.be.jjjh.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoreCategoryDTO {  //결제 내역의 카테고리 정보 저장
	 
	 private String categoryCode;
     private String categoryName; 
     private Long usageCount;  //카테고리 카운트
     
}
