package com.urcarcher.be.kimjuvid.tourguide;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.net.URISyntaxException;

@CrossOrigin
@RestController
@RequestMapping("/api/tour")
public class TourController {

    private static final Logger logger = LoggerFactory.getLogger(TourController.class);

    @Value("${tourapi.key}")
    private String serviceKey;

    @GetMapping("/tour-info")
    public String getTourDetail(
            @RequestParam(value = "numOfRows", defaultValue = "10") String numOfRows,
            @RequestParam(value = "pageNo", defaultValue = "1") String pageNo,
            @RequestParam(value = "MobileOS", defaultValue = "ETC") String mobileOS,
            @RequestParam(value = "MobileApp", defaultValue = "AppTest") String mobileApp,
            @RequestParam(value = "_type", defaultValue = "json") String type,
            @RequestParam(value = "listYN", defaultValue = "Y") String listYN,
            @RequestParam(value = "arrange", defaultValue = "R") String arrange,
            @RequestParam(value = "contentTypeId", defaultValue = "12") String contentTypeId, // 관광타입ID = 관광지 : 12 / 식당 : 
            @RequestParam(value = "areaCode", required = false) String areaCode,
            @RequestParam(value = "sigunguCode", required = false) String sigunguCode,
            @RequestParam(value = "cat1", required = false) String cat1,
            @RequestParam(value = "cat2", required = false) String cat2,
            @RequestParam(value = "cat3", required = false) String cat3,
            @RequestParam(value = "modifiedtime", required = false) String modifiedtime) {

        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B551011/KorService1/areaBasedList1?");
        urlBuilder.append("serviceKey=").append(serviceKey)
                  .append("&numOfRows=").append(numOfRows)
                  .append("&pageNo=").append(pageNo)
                  .append("&MobileOS=").append(mobileOS)
                  .append("&MobileApp=").append(mobileApp)
                  .append("&_type=").append(type)
                  .append("&listYN=").append(listYN)
                  .append("&arrange=").append(arrange)
                  .append("&contentTypeId=").append(contentTypeId);

        if (areaCode != null) {
            urlBuilder.append("&areaCode=").append(areaCode);
        }
        if (sigunguCode != null) {
            urlBuilder.append("&sigunguCode=").append(sigunguCode);
        }
        if (cat1 != null) {
            urlBuilder.append("&cat1=").append(cat1);
        }
        if (cat2 != null) {
            urlBuilder.append("&cat2=").append(cat2);
        }
        if (cat3 != null) {
            urlBuilder.append("&cat3=").append(cat3);
        }
        if (modifiedtime != null) {
            urlBuilder.append("&modifiedtime=").append(modifiedtime);
        }

        try {
            URI uri = new URI(urlBuilder.toString());
            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(uri, String.class);
            // test
            System.out.println(response);
            logger.info("API Response: {}", response);
            return response;
        } catch (URISyntaxException e) {
            logger.error("Invalid URI syntax", e);
            return "Error creating URI: " + e.getMessage();
        } catch (Exception e) {
            logger.error("Error fetching tour information", e);
            return "Error fetching tour information: " + e.getMessage();
        }
    }
    
 // 새로운 세부 정보 조회 엔드포인트
    @GetMapping("/tour-detail")
    public String getTourDetail(
            @RequestParam(value = "contentId") String contentId,
            @RequestParam(value = "MobileOS", defaultValue = "ETC") String mobileOS,
            @RequestParam(value = "MobileApp", defaultValue = "AppTest") String mobileApp,
            @RequestParam(value = "_type", defaultValue = "json") String type) {

        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B551011/KorService1/detailCommon1?");
        urlBuilder.append("serviceKey=").append(serviceKey)
                  .append("&contentId=").append(contentId)
                  .append("&MobileOS=").append(mobileOS)
                  .append("&MobileApp=").append(mobileApp)
                  .append("&_type=").append(type)
                  .append("&defaultYN=Y")
                  .append("&firstImageYN=Y")
                  .append("&areacodeYN=Y")
                  .append("&catcodeYN=Y")
                  .append("&addrinfoYN=Y")
                  .append("&mapinfoYN=Y")
                  .append("&overviewYN=Y");

        try {
            URI uri = new URI(urlBuilder.toString());
            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(uri, String.class);
            logger.info("API Response: {}", response);
            return response;
        } catch (URISyntaxException e) {
            logger.error("Invalid URI syntax", e);
            return "Error creating URI: " + e.getMessage();
        } catch (Exception e) {
            logger.error("Error fetching tour detail", e);
            return "Error fetching tour detail: " + e.getMessage();
        }
    }
}
