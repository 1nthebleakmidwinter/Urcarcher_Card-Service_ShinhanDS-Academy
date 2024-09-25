package com.urcarcher.be;

import java.sql.Date;

import com.urcarcher.be.kimyuri.CardTypeDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Data
public class HomeCardDTO {
	private Long cardId;
	private String card_number;
	private Double cardBalance;
    private String cardAccount;
    private String cardName;
    private String cardUsage;//신용카드 or 선불카드
    private Date expiration_date;
    private String name;

    private Integer point;
    private Double totalPayment; //이번달 총 카드 사용 금액
    
    
}
