package com.urcarcher.be.jjjh.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="store")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoreEntity {
    @Id
    private String storeId; 

    private String storeName;

    private String storeAddr;
    
    private String storeRoadAddr;
    
    private String storePhone;

    private String storeUrl;
    
    @Column(name = "store_x")
    private String storeX; //경도
    
    @Column(name = "store_y")
    private String storeY; //위도
    
    private String categoryCode;  
    
    private String categoryName;   
    
}

