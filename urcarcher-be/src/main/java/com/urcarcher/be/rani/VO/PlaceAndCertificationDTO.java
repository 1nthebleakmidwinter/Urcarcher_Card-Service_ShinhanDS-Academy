package com.urcarcher.be.rani.VO;

import java.util.List;

import lombok.Data;

@Data
public class PlaceAndCertificationDTO {
	private List<PlaceDTO> places;
    private List<CertificationDTO> certifications;
}
