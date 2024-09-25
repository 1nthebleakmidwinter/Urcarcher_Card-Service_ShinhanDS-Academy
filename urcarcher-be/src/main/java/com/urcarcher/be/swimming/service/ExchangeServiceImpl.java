package com.urcarcher.be.swimming.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.urcarcher.be.blkwntr.entity.Member;
import com.urcarcher.be.blkwntr.exrate.ExchangeType;
import com.urcarcher.be.blkwntr.exrate.service.ExchangeRateService;
import com.urcarcher.be.kimyuri.CardEntity;
import com.urcarcher.be.kimyuri.CardTypeEntity;
import com.urcarcher.be.swimming.dto.ExchangeCardDTO;
import com.urcarcher.be.swimming.dto.ExchangeInfoDTO;
import com.urcarcher.be.swimming.dto.ExchangeMemberDTO;
import com.urcarcher.be.swimming.dto.ExchangeSetDTO;
import com.urcarcher.be.swimming.entity.ExchangeInfoEntity;
import com.urcarcher.be.swimming.entity.ExchangeSetEntity;
import com.urcarcher.be.swimming.repository.ExchangeRepository;
import com.urcarcher.be.swimming.repository.ExchangeSetRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;

@RequiredArgsConstructor
@Service
public class ExchangeServiceImpl implements ExchangeService {
	private final ExchangeRepository exRepo;
	private final ExchangeSetRepository setRepo;
	private final ExchangeRateService rateService;
	private static Map<ExchangeType, JSONObject> exchangeList = new HashMap<>();
	
	// 로그인 유저 국적 조회
	@Override
	public ExchangeMemberDTO findMember(String memberId) {
		Member entity = exRepo.findMember(memberId);
		
		if (entity == null) return null;
		
		return memberEntityToDto(entity);
	}
	
	// 카드 리스트 조회
	@Override
	public List<ExchangeCardDTO> getList(String memberId) {
		List<Object[]> entityList = exRepo.findByMemberId(memberId);
		
		/*
		List<CardDTO> dtoList = entityList.stream().map(entity -> cardEntityToDto(entity)).collect(Collectors.toList());
		
		entityList.forEach(arr -> {
			CardEntity card = (CardEntity)arr[0];
			CardTypeEntity cardType = (CardTypeEntity)arr[1];
		
			System.out.println(Arrays.toString(arr));
		});
		*/
		
		List<ExchangeCardDTO> dtoList = entityList.stream()
				.map(arr -> {
					// 오브젝트 타입의 배열이 들어오기 때문에 지정
					CardEntity card = (CardEntity)arr[0];
					CardTypeEntity type = (CardTypeEntity)arr[1];
				
					return cardEntityToDto(card, type);
				})
				.collect(Collectors.toList());

        return dtoList;
	}
	
	// 바로 환전
	@Transactional
	@Override
	public void exchangeInsert(ExchangeInfoDTO infoDto, String memberId) {
		// 환전할 카드 가져오기
		CardEntity card = exRepo.findByCard(memberId, infoDto.getCardId());
		
		// 카드잔액 + 환전금액 update
		if (card != null) {
			Double plusCur = card.getCardBalance() + infoDto.getExCur().doubleValue();
			exRepo.plusCurrency(card.getCardId(), plusCur);
		}
		
		// 환전 내역에 추가
		exRepo.save(infoDtoToEntity(infoDto));
	}
	
	// 예약 내역 조회
	@Override
	public ExchangeSetDTO setDetail(Long cardId, String memberId) {
		// 예약할 카드 가져오기
		CardEntity card = exRepo.findByCard(memberId, cardId);
		
		ExchangeSetEntity entity = setRepo.findByCurSet(card.getCardId());
		// System.out.println("******************** entity 확인" + entity);
		
		if (entity == null) return null;
		
		return setEntityToDto(entity);
	}

	// 예약 환전
	@Override
	public void setInsert(ExchangeSetDTO setDto, String memberId) {
		setRepo.save(setDtoToEntity(setDto));
	}

	// 예약 내역 삭제
	@Override
	public void setDelete(Long setId) {
		setRepo.deleteById(setId);
	}

	// 환전 내역 전체 조회
	@Override
	public List<ExchangeInfoDTO> infoList(Long cardId, String memberId) {
		// 조회할 카드 가져오기
		CardEntity card = exRepo.findByCard(memberId, cardId);
		
		List<ExchangeInfoDTO> infoList = exRepo.findByExchangeInfo(card.getCardId())
				.stream().map(entity -> infoEntityToDto(entity))
				.collect(Collectors.toList());
		
		if (infoList == null) return null;
		
		return infoList;
	}

	// 환전 내역 상세 조회
	@Override
	public ExchangeInfoDTO infoDetail(Long exId) {
		ExchangeInfoEntity entity = exRepo.findByInfoDetail(exId);
		
		if (entity == null) return null;
		
		return infoEntityToDto(entity);
	}
	
	// 예약 환전 스케줄러
	@Scheduled(fixedDelay = 1 * 30 * 1000) // 30초 간격으로 실행
	@Transactional
	public void runExchange() {
		// 오늘 날짜와 같은 예약일 리스트
		// LocalDate today = LocalDate.now();
		// List<ExchangeSetEntity> setList = setRepo.findDateSet(today);
		
		// 테스트용 날짜 지정
		LocalDate testDate = LocalDate.of(2024, 9, 13);
		List<ExchangeSetEntity> setList = setRepo.findDateSet(testDate);
		
		// 실시간 환율 조회
		exchangeList = rateService.getAllRateInfo();
		
		// insert 된 set_id 담을 리스트
		List<Long> insertSetId = new ArrayList<>();
		
		// 환전 내역 insert (환전 금액, 결제 금액, 적용된 환율, 카드 아이디, 예약 아이디)
		for (ExchangeSetEntity set : setList) {
		    ExchangeType exchangeType = ExchangeType.valueOf(set.getNationality()); // 예약일 리스트 국적 추출
		    JSONObject exchangeInfo = exchangeList.get(exchangeType); // 국적 별 환율 리스트
		    
		    if (exchangeInfo != null) {
		        // 환율 정보 추출
		        String rateString = exchangeInfo.getAsString("rate").replace(",", ""); // 문자열 쉼표 제거
		        Double rate = Double.parseDouble(rateString); // 매매기준율
		        
		        String buyString = exchangeInfo.getAsString("buy").replace(",", ""); // 문자열 쉼표 제거
		        Double buy = Double.parseDouble(buyString); // 현찰 살 때
		        
		        System.out.println("** " + set.getNationality() + " 매매기준율 : " + rate + " / " + "현찰 살 때 : " + buy);
		        
		        // 환율 우대 90% 적용된 예상 원화 계산
		        // 매매기준율 + (현찰 살 때 - 매매기준율) * (1 - 환율 우대율)
		        Double calculatAmt = rate + (buy - rate) * (1 - 0.9); // 소수점 처리 전
		        System.out.println("** 계산된 원화 : " + calculatAmt);
		        
		        // 반올림 하지 않고 소수점 두번째 자리까지 버리기
		        calculatAmt = Double.valueOf(String.format("%.2f", calculatAmt));
		        
		        ExchangeInfoEntity info = new ExchangeInfoEntity();
		        boolean check = exRepo.checkByExInfo(set); // 중복 여부 확인
		        
		        if (!check) {
		            info.setExCur(set.getSetCur());
		            info.setExPay(calculatAmt);
		            info.setExRate(rate);
		            info.setCard(set.getCard());
		            info.setExchangeSet(set);
		            
		            exRepo.save(info);
		            insertSetId.add(set.getSetId()); // set_id 리스트에 추가
		            
		            System.out.println("** insert data : " + info);
		        } else {
		            System.out.println("이미 환전 된 예약 : " + info);
		        }
		    } else {
		        System.out.println(set.getNationality() + " 환율 정보 조회 실패");
		    }
		}
		
		// 카드 잔액, 예약 상태 update
	    for (Long setId : insertSetId) {
	        ExchangeSetEntity setEntity = setRepo.findById(setId).orElse(null);
	        
	        if (setEntity != null) {
	        	setEntity.setSetStatus("Y"); // 상태값 N => Y
	        	
	        	// 환전 금액 만큼 잔액 추가
	            CardEntity card = setEntity.getCard();
	            Double plusCur = card.getCardBalance() + setEntity.getSetCur().doubleValue();
	            
	            // 바뀐 상태값 저장
				exRepo.plusCurrency(card.getCardId(), plusCur);
	            setRepo.save(setEntity);
	            
	            System.out.println("** 카드 잔액, 예약 상태값 업데이트 : " + setId);
	        } else {
	        	System.out.println("** " + setId + " 내역 없음");
	        }
	    }
		
		System.out.println("============================== 30초 간격으로 스케줄러 실행 ==============================");
		System.out.println("** 오늘 날짜와 같은 예약일 리스트 : " + setList);
		// System.out.println("** 유저 국적 리스트 : " + nationList);
		// System.out.println("** 실시간 환율 정보 : " + exchangeList);
	}
}