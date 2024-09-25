package com.urcarcher.be.jjjh;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.urcarcher.be.jjjh.dto.LinkPreviewDTO;

import lombok.extern.log4j.Log4j2;
import net.minidev.json.JSONObject;

@CrossOrigin
@Log4j2
@RestController
@RequestMapping("/api/preview")
public class UrlPreviewController {
	
	@GetMapping("/url")
	public LinkPreviewDTO getUrlPreview(@RequestParam("url") String url) throws Exception {
        try {
        	// 원래 URL에서 https 수정, /main/v/ 추가
        	url = transformUrl(url);
        	// Jsoup을 사용
        	Document doc = Jsoup.parse(url);
            String jsonUrl = url;
            // JSON 데이터 추출
            String jsonResponse = fetchJsonFromUrl(jsonUrl);
            // JSON 파싱 및 mainphotourl 추출
            String imageUrl = extractMainPhotoUrl(jsonResponse); //mainPhotoUrl
            LinkPreviewDTO dto = new LinkPreviewDTO(imageUrl);
            //System.out.println(dto);
            return dto;
    
        } catch (IOException e) {
            e.printStackTrace();
            return new LinkPreviewDTO("실패");
        }
    }
	// 넘어오는 url 형태 : http://place.map.kakao.com/2040780653
	// 수정 할 url 형태 : https://place.map.kakao.com/main/v/2040780653
	// 얻어야 하는 이미지 url : http://t1.daumcdn.net/place/7440664029DC46ABB5849413E1F011DF
	
	
	 // URL 변환 함수
    private String transformUrl(String originalUrl) {
    	
    	//System.out.println(originalUrl.replace(".com/", ".com/main/v/"));
    	originalUrl = originalUrl.replace("http", "https");
    	originalUrl = originalUrl.replace(".com/", ".com/main/v/");
    	
        return originalUrl;
    }

    // JSON 데이터를 URL에서 가져오는 함수
    private String fetchJsonFromUrl(String urlString) throws Exception {
        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Accept", "application/json");

        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String inputLine;
        StringBuilder content = new StringBuilder();

        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }

        in.close();
        conn.disconnect();

        return content.toString();
    }

    // JSON에서 mainphotourl을 추출하는 함수
    private String extractMainPhotoUrl(String jsonResponse) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(jsonResponse);
        return rootNode.path("basicInfo").path("mainphotourl").asText();
    }

}
