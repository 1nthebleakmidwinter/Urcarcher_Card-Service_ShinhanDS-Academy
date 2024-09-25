package com.urcarcher.be.kimyuri;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Data
public class CardDTO {
    Long cardId;
    String cardNumber;
    String cvvCode; 
    Double cardBalance;
    Boolean cardStatus;
    LocalDate issueDate;
    LocalDate expirationDate;
    String cardPassword;
    String cardPickup;
    LocalDate pickupDate;
    String cardAccount;
    String paymentBank;
    LocalDate paymentDate;
    Boolean transportation;
    
    
    String  memberId;  // member 테이블
    Long cardTypeId;  // card_type 테이블
}
