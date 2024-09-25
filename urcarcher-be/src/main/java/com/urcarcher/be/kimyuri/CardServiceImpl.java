package com.urcarcher.be.kimyuri;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.urcarcher.be.blkwntr.entity.Member;
import com.urcarcher.be.blkwntr.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    final CardRepository cardRepo;
    final MemberRepository memberRepo;
    final CardTypeRepository cardTypeRepo;

//    @Override
//    public void create(CardDTO dto) {
//        CardEntity entity = dtoToEntity(dto);
//        cardRepo.save(entity);
//    }
    
//    @Override
//    public void create(CardDTO dto) {
//        Member member = memberRepo.findById(dto.getMemberId()).orElse(null);
//        CardTypeEntity cardType = cardTypeRepo.findById(dto.getCardTypeId()).orElse(null);
//        CardEntity entity = dtoToEntity(dto, member, cardType);
//        cardRepo.save(entity);
//    }
    
    @Override
    public boolean deleteCardWithPassword(Long cardId, String password) {
        int deletedRows = cardRepo.deleteByCardIdAndPassword(cardId, password);
        return deletedRows > 0;
    }
    
    @Override
    public boolean toggleCardStatus(Long cardId, Boolean isActive) {
    	int result = cardRepo.updateCardStatus(cardId,isActive);
    	return result > 0;
    }
    
    @Override
    public boolean checkPinNumber(Long cardId, String checkPinNumber) {
    	boolean result = cardRepo.existsByCardIdAndCardPassword(cardId, checkPinNumber);
    	return result;
    }
    
    @Override
    public boolean changePinNumber(Long cardId, String pinNumber) {
    	int result = cardRepo.updateCardPassword(cardId, pinNumber);
    	return result>0;
    }
    
    @Override
    public boolean chargeAmount(Long cardId, Double cardBalance) {
    	int rusult = cardRepo.updateCardBalance(cardId, cardBalance);
    	return rusult > 0;
    }
    
    @Override
    public boolean usePayment(Long cardId, Double cardBalance) {
    	int rusult = cardRepo.subtractFromCardBalance(cardId, cardBalance);
    	return rusult > 0;
    }
    
    @Override
    public List<CardDTO> getCardInfo(String memberId) {
    	List<CardEntity> cardEntities = cardRepo.findByMemberId(memberId);
    	
    	if (cardEntities.isEmpty()) {
            return Collections.emptyList();
        }
    	
    	// CardEntity 리스트를 CardDTO 리스트로 변환
        List<CardDTO> cardDTOs = cardEntities.stream()
            .map(this::entityToDTO)
            .collect(Collectors.toList());

        return cardDTOs;
    }
    
    
    
    @Override
    public void create(CardDTO dto) {
        Member member = memberRepo.findById(dto.getMemberId()).orElseThrow(() -> new RuntimeException("Member not found"));
        CardTypeEntity cardType = cardTypeRepo.findById(dto.getCardTypeId()).orElseThrow(() -> new RuntimeException("Card Type not found"));

        CardEntity entity = dtoToEntity(dto, member, cardType);
        cardRepo.save(entity);
    }

    

    @Override
    public List<CardDTO> readAll() {
        List<CardEntity> entityList = (List<CardEntity>) cardRepo.findAll();

        List<CardDTO> dtoList = entityList.stream().map(entity -> entityToDTO(entity))
                .collect(Collectors.toList());

        return dtoList;
    }

    @Override
    public CardDTO readById(Long cardId) {
        CardEntity entity = cardRepo.findById(cardId).orElse(null);
        return entity != null ? entityToDTO(entity) : null;
    }

    @Override
    public void update(CardDTO dto) {
        cardRepo.findById(dto.getCardId()).ifPresent(card -> {
            card.setCardNumber(dto.getCardNumber());
            card.setCvvCode(dto.getCvvCode());
            card.setCardBalance(dto.getCardBalance());
            card.setCardStatus(dto.getCardStatus());
            card.setIssueDate(dto.getIssueDate());
            card.setExpirationDate(dto.getExpirationDate());
            card.setCardPassword(dto.getCardPassword());
            card.setCardPickup(dto.getCardPickup());
            card.setPickupDate(dto.getPickupDate());
            card.setCardAccount(dto.getCardAccount());
            card.setPaymentBank(dto.getPaymentBank());
            card.setPaymentDate(dto.getPaymentDate());
            card.setTransportation(dto.getTransportation());

            cardRepo.save(card);
        });
    }

    @Override
    public void delete(Long cardId) {
        cardRepo.deleteById(cardId);
    }
}
