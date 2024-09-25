package com.urcarcher.be.jjjh.service;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class KakaoMapService {
	
	 	private final String KAKAO_API_KEY = "93dd1908c476fbdb94ec258f697c680d";  // 발급받은 REST API 키
	    //private final String KAKAO_API_URL = "https://dapi.kakao.com/v2/local/search/keyword.json";
	    
	 	public JsonNode searchPlaceByKeyword(String keyword) {
	    	 try {
	    		 	//Rest Template 객체 생성
	    	        RestTemplate restTemplate = new RestTemplate();
	    	        //헤더 설정을 위해 HttpHeaders클래스 생성한 후 HttpEntity 객체에 넣어줌
	    	        HttpHeaders headers = new HttpHeaders();
	    	        headers.set("Authorization", "KakaoAK " + KAKAO_API_KEY); 

	    	        HttpEntity<String> entity = new HttpEntity<>(headers);

	    	        String url = "https://dapi.kakao.com/v2/local/search/keyword.json?query=" + keyword;

	    	        // exchange()로 API 호출
	    	        ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.GET, entity, JsonNode.class);

	    	        // 결과 반환
	    	        if (response.getStatusCode().is2xxSuccessful()) {
	    	        	
	    	        	//응답 값
	    	        	JsonNode result = response.getBody();
	                    
	    	        	return result; 
	    	        } else {
	    	            System.out.println("Error: " + response.getStatusCode());
	    	            return null;
	    	        }
	    	    } catch (Exception e) {
	    	        e.printStackTrace();
	    	        return null;
	    	    }
	    	
	    }
	 	
	 	
	 	// 디코딩 메서드
	 	public JsonNode decodeKeywordField(JsonNode jsonResponse) {
	 	    if (jsonResponse.has("same_name")) {
	 	        JsonNode sameNameNode = jsonResponse.get("same_name");
	 	        String encodedKeyword = sameNameNode.get("keyword").asText();
	 	        String decodedKeyword = URLDecoder.decode(encodedKeyword, StandardCharsets.UTF_8);
	 	        ((ObjectNode) sameNameNode).put("keyword", decodedKeyword);
	 	    }
	 	    return jsonResponse;
	 	}
	    
	
}
