package com.urcarcher.be.rani;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.urcarcher.be.blkwntr.TestDTO;
import com.urcarcher.be.blkwntr.entity.Member;
import com.urcarcher.be.rani.VO.CertificationDTO;
import com.urcarcher.be.rani.VO.CourseCertificationEntity;
import com.urcarcher.be.rani.VO.CourseDTO;
import com.urcarcher.be.rani.VO.PlaceAndCertificationDTO;
import com.urcarcher.be.rani.VO.PlaceDTO;
import com.urcarcher.be.rani.repository.CertificationRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/course")
public class TravelCourseController {

	@Autowired
	CourseService courseService;
	

	
	
	@GetMapping("/list")
	List<CourseDTO> courseList(){
		return courseService.getCourseList();
	}
	
	@GetMapping("/{courseId}")
	PlaceAndCertificationDTO placeList(@PathVariable("courseId") String courseId, @AuthenticationPrincipal UserDetails userDetails){
		courseService.incrementViewCount(courseId);
		List<CertificationDTO> certifications;
		if(userDetails == null) {
			certifications = null;
		}
		else {
			String userId = userDetails.getUsername();
				certifications = courseService.getCertification(userId);
		}
		
		List<PlaceDTO> places = courseService.getPlaceList(courseId);
		PlaceAndCertificationDTO response = new PlaceAndCertificationDTO();
	    response.setPlaces(places);
	    response.setCertifications(certifications);
	    return response;
	    

	}
	
	@PostMapping("/certification")
	void certification(@RequestBody CertificationDTO certification, @AuthenticationPrincipal UserDetails userDetails) {
		String userId = userDetails.getUsername();
		certification.setMemberId(userId);
		CourseCertificationEntity entity = courseService.dtoToEntity(certification);
		courseService.saveCertification(entity);
		
		
	}
	
	@Value("${google.api.key}")
    private String googleApiKey;

    @PostMapping("/geolocation")
    public ResponseEntity<?> getGeolocation() {
        String url = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + googleApiKey;

        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> body = new HashMap<>();
        body.put("considerIp", true);

        try {
            Map<String, Object> response = restTemplate.postForObject(url, body, Map.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving geolocation: " + e.getMessage());
        }
    }
    
}
