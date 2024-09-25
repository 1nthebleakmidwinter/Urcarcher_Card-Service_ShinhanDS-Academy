package com.urcarcher.be.kimyuri;

import java.util.List;

public interface CardTypeService {

	List<CardTypeDTO> readAll();
	
	// Entity -> DTO
	default CardTypeDTO entityToDTO(CardTypeEntity entity) {
		CardTypeDTO dto = CardTypeDTO.builder()
				   .cardTypeId(entity.getCardTypeId())
	                .cardName(entity.getCardName())
	                .cardUsage(entity.getCardUsage())
	                .cardLimit(entity.getCardLimit())
	                .annualFee(entity.getAnnualFee())
	                .cardImg(entity.getCardImg())
	                .build();
		return dto;
				
	}
	
	
}
