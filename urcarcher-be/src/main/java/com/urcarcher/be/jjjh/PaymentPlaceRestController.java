package com.urcarcher.be.jjjh;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.urcarcher.be.jjjh.dto.StoreCategoryDTO;
import com.urcarcher.be.jjjh.dto.StoreWithCountDTO;
import com.urcarcher.be.jjjh.repository.StoreRepository;
import com.urcarcher.be.jjjh.service.StoreService;

import lombok.extern.log4j.Log4j2;

@CrossOrigin
@Log4j2
@RestController
@RequestMapping("/api/paymentPlace")
public class PaymentPlaceRestController {
	
	@Autowired
    private StoreService storeService;
	
	//특정 회원의 한 달간 결제 내역 중 카테고리 정보
	@GetMapping("/categories")
    public ResponseEntity<List<StoreCategoryDTO>> getCategories(@RequestParam("memberId") String memberId) {
		System.out.println("memberId:"+ memberId);
	    
	    List<StoreCategoryDTO> categories = storeService.getMostUsedCategories(memberId);
        return ResponseEntity.ok(categories);  // JSON 형태로 반환됨
    }
	
	//특정 회원의 한 달간 결제 내역 중 상위 3개 카테고리
	@GetMapping("/top-categories")
    public ResponseEntity<List<StoreCategoryDTO>> getTopCategories(@RequestParam("memberId") String memberId) {
	    
		System.out.println("memberId:"+ memberId);
	    
	    List<StoreCategoryDTO> categories = storeService.findTopCategoriesByMemberId(memberId);
	    
	    System.out.println("categories"+ categories);
	    
        return ResponseEntity.ok(categories);  // JSON 형태로 반환됨
    }
	
   @GetMapping("/best-store")
    public List<StoreWithCountDTO> getMostUsedStoresExcludingMember() { 
	   
        return storeService.getMostUsedStoresExcludingMember();
    }
}