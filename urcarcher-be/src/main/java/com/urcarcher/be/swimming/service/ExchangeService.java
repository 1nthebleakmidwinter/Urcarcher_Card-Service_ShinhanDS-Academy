package com.urcarcher.be.swimming.service;

import java.util.List;

import com.urcarcher.be.blkwntr.entity.Member;
import com.urcarcher.be.kimyuri.CardEntity;
import com.urcarcher.be.kimyuri.CardTypeEntity;
import com.urcarcher.be.swimming.dto.ExchangeCardDTO;
import com.urcarcher.be.swimming.dto.ExchangeInfoDTO;
import com.urcarcher.be.swimming.dto.ExchangeMemberDTO;
import com.urcarcher.be.swimming.dto.ExchangeSetDTO;
import com.urcarcher.be.swimming.entity.ExchangeInfoEntity;
import com.urcarcher.be.swimming.entity.ExchangeSetEntity;

public interface ExchangeService {
	// 로그인 유저 국적 조회
	public ExchangeMemberDTO findMember(String memberId);
	
	// 카드 리스트 조회
	public List<ExchangeCardDTO> getList(String memberId);
	
	// 바로 환전
	public void exchangeInsert(ExchangeInfoDTO infoDto, String memberId);
	
	// 예약 내역 조회
	public ExchangeSetDTO setDetail(Long cardId, String memberId);
	
	// 예약 환전
	public void setInsert(ExchangeSetDTO setDto, String memberId);
	
	// 예약 내역 삭제
	public void setDelete(Long setId);
	
	// 환전 내역 전체 조회
	public List<ExchangeInfoDTO> infoList(Long cardId, String memberId);
	
	// 환전 내역 상세 조회
	public ExchangeInfoDTO infoDetail(Long exId);
	
	// 바로 환전 DTO -> Entity
	default ExchangeInfoEntity infoDtoToEntity(ExchangeInfoDTO infoDto) {
		Member memberEntity = Member.builder()
				.memberId("bleakwinter")
				.build();
		
		CardEntity cardEntity = CardEntity.builder()
				.cardId(infoDto.getCardId())
				.build();
		
		ExchangeInfoEntity infoEntity = ExchangeInfoEntity.builder()
				.exId(infoDto.getExId())
				.exRate(infoDto.getExRate())
				.exCur(infoDto.getExCur())
				.exPay(infoDto.getExPay())
				.exDate(infoDto.getExDate())
				.card(cardEntity)
				.build();
		
		// System.out.println("******************** infoEntity 확인 : " + infoEntity);
		return infoEntity;
	}
	
	// 바로 환전 Entity -> DTO
	default ExchangeInfoDTO infoEntityToDto(ExchangeInfoEntity infoEntity) {
		ExchangeInfoDTO infoDto = ExchangeInfoDTO.builder()
				.exId(infoEntity.getExId())
				.cardId(infoEntity.getCard().getCardId())
				.cardUsage(infoEntity.getCard().getCardType().getCardUsage())
				.cardBalance(infoEntity.getCard().getCardBalance())
				.setId(infoEntity.getExchangeSet() != null ? infoEntity.getExchangeSet().getSetId() : null)
				.exRate(infoEntity.getExRate())
				.exCur(infoEntity.getExCur())
				.exPay(infoEntity.getExPay())
				.exDate(infoEntity.getExDate())
				.build();
		
		// System.out.println("******************** infoDTO 확인 : " + infoDto);
		return infoDto;
	}
	
	// 예약 환전 DTO -> Entity
	default ExchangeSetEntity setDtoToEntity(ExchangeSetDTO setDto) {
		Member memberEntity = Member.builder()
				.memberId("bleakwinter")
				.build();
		
		CardEntity cardEntity = CardEntity.builder()
				.cardId(setDto.getCardId())
				.build();
		
		ExchangeSetEntity setEntity = ExchangeSetEntity.builder()
				.setId(setDto.getSetId())
//				.setRate(setDto.getSetRate())
				.setCur(setDto.getSetCur())
//				.setPay(setDto.getSetPay())
				.setDate(setDto.getSetDate())
				.setUpdate(setDto.getSetUpdate())
				.setStatus(setDto.getSetStatus())
				.nationality(setDto.getNationality())
				.card(cardEntity)
				.build();
		
		// System.out.println("******************** setEntity 확인 : " + setEntity);
		return setEntity;
	};
	
	// 예약 환전 Entity -> DTO
	default ExchangeSetDTO setEntityToDto(ExchangeSetEntity setEntity) {
		ExchangeSetDTO setDto = ExchangeSetDTO.builder()
				.setId(setEntity.getSetId())
				.cardId(setEntity.getCard().getCardId())
				.cardUsage(setEntity.getCard().getCardType().getCardUsage())
//				.setRate(setEntity.getSetRate())
				.setCur(setEntity.getSetCur())
//				.setPay(setEntity.getSetPay())
				.setDate(setEntity.getSetDate())
				.setUpdate(setEntity.getSetUpdate())
				.setStatus(setEntity.getSetStatus())
				.nationality(setEntity.getNationality())
				.build();
		
		// System.out.println("******************** setDto 확인 : " + setDto);
		return setDto;
	}

	// 카드 리스트 조회 Entity -> DTO
	default ExchangeCardDTO cardEntityToDto(CardEntity card, CardTypeEntity type) {
		ExchangeCardDTO dto = ExchangeCardDTO.builder()
				.cardId(card.getCardId())
				.cardNumber(card.getCardNumber())
				.cardBalance(card.getCardBalance())
				.cardUsage(type.getCardUsage())
				.cardTypeId(type.getCardTypeId())
				.build();
		
		return dto;
	}
	
	// 로그인 유저 국적, 카드 ID 조회 Entity -> DTO
	default ExchangeMemberDTO memberEntityToDto(Member member) {
		ExchangeMemberDTO dto = ExchangeMemberDTO.builder()
				// .memberId(member.getMemberId())
				.nationality(member.getNationality())
				.build();
		
		return dto;
	}
}