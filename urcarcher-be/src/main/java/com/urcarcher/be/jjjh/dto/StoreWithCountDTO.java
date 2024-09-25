package com.urcarcher.be.jjjh.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoreWithCountDTO {
	private String storeId; 

    private String storeName;

    private String storeAddr;
    
    private String storeRoadAddr;

    private String storePhone;
    
    private String storeUrl;
    
    private String storeX; //경도
    
    private String storeY; //위도
    
    private String categoryCode;  
    
    private String categoryName; 
    
    private Long paymentCount;  //결제 건수 추가
    
}
