package com.urcarcher.be.kimyuri;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;

import com.urcarcher.be.blkwntr.entity.Member;


public interface CardService {

    // 입력
   void create(CardDTO dto);

    // 조회
    List<CardDTO> readAll();

    // 상세보기
    CardDTO readById(Long cardId);

    // 수정
    void update(CardDTO dto);

    // 삭제
    void delete(Long cardId);
    
    boolean deleteCardWithPassword(Long cardId, String password);
    
    boolean toggleCardStatus(Long cardId, Boolean isActive);
    
    boolean checkPinNumber(Long cardId, String checkPinNumber);
    
    boolean changePinNumber(Long cardId, String pinNumber);
    
    boolean chargeAmount(Long cardId, Double cardBalance);
    
    boolean usePayment(Long cardId, Double cardBalance);
    
    List<CardDTO> getCardInfo(String memberId);
    
    // Entity -> DTO
    default CardDTO entityToDTO(CardEntity entity) {
        CardDTO dto = CardDTO.builder()
                .cardId(entity.getCardId())
                .cardNumber(entity.getCardNumber())
                .cvvCode(entity.getCvvCode())
                .cardBalance(entity.getCardBalance())
                .cardStatus(entity.getCardStatus())
                .issueDate(entity.getIssueDate())
                .expirationDate(entity.getExpirationDate())
                .cardPassword(entity.getCardPassword())
                .cardPickup(entity.getCardPickup())
                .pickupDate(entity.getPickupDate())
                .cardAccount(entity.getCardAccount())
                .paymentBank(entity.getPaymentBank())
                .paymentDate(entity.getPaymentDate())
                .transportation(entity.getTransportation())
                
                .memberId(entity.getMember() != null ? entity.getMember().getMemberId() : null)
                .cardTypeId(entity.getCardType() != null ? entity.getCardType().getCardTypeId() : null)
                .build();
        return dto;
    }

    // DTO -> Entity
//    default CardEntity dtoToEntity(CardDTO dto) {
    default CardEntity dtoToEntity(CardDTO dto, Member member, CardTypeEntity cardType) {
        CardEntity entity = CardEntity.builder()
//                .cardId(dto.getCardId())
                .cardNumber(dto.getCardNumber())
                .cvvCode(dto.getCvvCode())
                .cardBalance(dto.getCardBalance())
                .cardStatus(dto.getCardStatus())
                .issueDate(dto.getIssueDate())
                .expirationDate(dto.getExpirationDate())
                .cardPassword(dto.getCardPassword())
                .cardPickup(dto.getCardPickup())
                .pickupDate(dto.getPickupDate())
                .cardAccount(dto.getCardAccount())
                .paymentBank(dto.getPaymentBank())
                .paymentDate(dto.getPaymentDate())
                .transportation(dto.getTransportation())
                
                .member(member)
                .cardType(cardType)
                .build();
        return entity;
    }
    
    
}
