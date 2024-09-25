package com.urcarcher.be.jjjh.dto;

import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoreDTO {
	
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
}
