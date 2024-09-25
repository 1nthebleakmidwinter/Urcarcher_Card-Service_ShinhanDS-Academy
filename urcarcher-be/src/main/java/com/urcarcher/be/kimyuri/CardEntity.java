package com.urcarcher.be.kimyuri;



import java.time.LocalDate;

import com.urcarcher.be.blkwntr.entity.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "card")
public class CardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long cardId;

    @Column(length = 100, nullable = false)
    String cardNumber; // 카드 16자리 번호

    @Column(length = 100, nullable = false)
    String cvvCode;

    @Column
    Double cardBalance; // 선불 카드 잔액

    @Column(length = 100, nullable = false)
    Boolean cardStatus; // 카드 상태(활성 / 비활성)

    @Column(nullable = false)
    LocalDate issueDate; // 카드발행일

    @Column(nullable = false)
    LocalDate expirationDate; // 카드만료일

    @Column(length = 4, nullable = false)
    String cardPassword;

    @Column(length = 100, nullable = false)
    String cardPickup; // 카드수령처

    @Column(nullable = false)
    LocalDate pickupDate; // 카드수령날짜

    @Column(length = 100)
    String cardAccount; // 계좌번호(신용카드연동계좌)

    @Column(length = 100)
    String paymentBank; // 결제은행(신용카드결제은행)

    @Column
    LocalDate paymentDate; // 신용카드 결제일

    @Column(nullable = false)
    Boolean transportation; // 교통카드기능신청여부

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    Member member;

    @ManyToOne
    @JoinColumn(name = "card_type_id", nullable = false)
    CardTypeEntity cardType;
}
