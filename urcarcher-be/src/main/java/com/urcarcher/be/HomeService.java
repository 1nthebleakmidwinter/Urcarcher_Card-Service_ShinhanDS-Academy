package com.urcarcher.be;

import java.sql.Date;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.urcarcher.be.blkwntr.repository.MemberRepository;
import com.urcarcher.be.blkwntr.repository.PointMapping;







@Service
public class HomeService{
	
	@Autowired
    HomeRepository homeRepository;
	
	@Autowired
	MemberRepository memberRepository;
	
	//이번 달 총 금액
	  public HomeCardDTO getCardDetailsWithTotalPayment(String memberId) {
		  Optional<Map<String, Object>> result =  homeRepository.findCardDetailsWithTotalPayment(memberId);
		  
		  Map<String, Object> map = result.orElse(null);
		  //System.out.println("=============@Service==========");
		 
		  HomeCardDTO dto = entityToHomeCardDTO(map);
	      return dto;
	  }

	  public HomeCardDTO entityToHomeCardDTO(Map<String, Object> map) {
		  HomeCardDTO card =  HomeCardDTO.builder().build();
	       for(String key:map.keySet()) {
	    	    if(key.equals("card_account")) card.setCardAccount((String)map.get(key));
	    	    if(key.equals("card_balance")) card.setCardBalance((Double) map.get(key));
	    	    if(key.equals("card_name")) card.setCardName((String)map.get(key));
	    	    if(key.equals("card_id")) card.setCardId((Long)map.get(key));
	    	    if(key.equals("card_usage")) card.setCardUsage((String)map.get(key));
	    	    if(key.equals("total_payment")) card.setTotalPayment((Double)map.get(key));
	    	    if(key.equals("card_number")) card.setCard_number((String)map.get(key));
	    	    if(key.equals("expiration_date")) card.setExpiration_date((Date) map.get(key));
	    	    if(key.equals("name")) card.setName((String)map.get(key));
	    	    
	       }
	       return card;
	    }
	  
	  public Integer getMemberPoint(String memberId) {
		Optional<PointMapping> x = memberRepository.findPointByMemberId(memberId);
		return x.isPresent() ? x.get().getPoint() : 0;
	  }
	
	
}
