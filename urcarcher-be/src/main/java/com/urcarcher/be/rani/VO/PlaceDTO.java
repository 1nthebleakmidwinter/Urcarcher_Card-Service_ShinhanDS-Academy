package com.urcarcher.be.rani.VO;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.urcarcher.be.rani.BigDecimalSerializer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class PlaceDTO {

	String placeId;
	String placeName;
	String address;
	

	@JsonFormat(shape = JsonFormat.Shape.STRING)
    @JsonSerialize(using = BigDecimalSerializer.class) // Custom serializer to control precision
    BigDecimal latitude;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @JsonSerialize(using = BigDecimalSerializer.class) // Custom serializer to control precision
    BigDecimal longitude;

    
	String content;
	String detailContent;
	String placeImg;
}
