package com.urcarcher.be.kimyuri;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor 
public class CardTypeServiceImpl implements CardTypeService{
	final CardTypeRepository cardTypeRepo;
	

	@Override
	public List<CardTypeDTO> readAll() {
		List<CardTypeEntity> entityList = (List<CardTypeEntity>) cardTypeRepo.findAll();
		
		List<CardTypeDTO> dtoList = entityList.stream().map(entity -> entityToDTO(entity))
				.collect(Collectors.toList());
		
		return dtoList;
	}
}
