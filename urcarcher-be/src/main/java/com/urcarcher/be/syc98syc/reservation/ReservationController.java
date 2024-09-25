package com.urcarcher.be.syc98syc.reservation;

//문화활동리스트, 세부조회
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;

@CrossOrigin
@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    private static final Logger logger = LoggerFactory.getLogger(ReservationController.class);

    @Value("${kopisapi.key}")
    private String serviceKey;

    @GetMapping("/reservation-info")
    public String getTourDetail(
            @RequestParam(value = "stdate", defaultValue = "20240801") String stdate,
            @RequestParam(value = "eddate", defaultValue = "20240901") String eddate,
            @RequestParam(value = "cpage", defaultValue = "1") String cpage,
            @RequestParam(value = "rows", defaultValue = "40") String rows,
           // @RequestParam(value = "shcate", defaultValue = "AAAA") String shcate,
           // @RequestParam(value = "shprfnm", defaultValue = "사랑") String shprfnm,
           // @RequestParam(value = "shprfnmfct", defaultValue = "예술의전당") String shprfnmfct,
           // @RequestParam(value = "prfplccd", defaultValue = "FC000003-01") String prfplccd,
            @RequestParam(value = "signgucode", defaultValue = "11") String signgucode,
            //@RequestParam(value = "signgucodesub", defaultValue = "1111") String signgucodesub,
            //@RequestParam(value = "kidstate", defaultValue = "Y") String kidstate,
           // @RequestParam(value = "prfstate", defaultValue = "01") String prfstate,
            //@RequestParam(value = "openrun", defaultValue = "Y") String openrun,
            @RequestParam(value = "newsql", defaultValue = "Y") String newsql) {

        StringBuilder urlBuilder = new StringBuilder("https://www.kopis.or.kr/openApi/restful/pblprfr?");
        urlBuilder.append("service=").append(serviceKey)
                  .append("&stdate=").append(stdate)
                  .append("&eddate=").append(eddate)
                  .append("&cpage=").append(cpage)
                  .append("&rows=").append(rows)
                  .append("&signgucode=").append(signgucode)
                  .append("&newsql=").append(newsql);
//                  .append("&shcate=").append(shcate)
//                  .append("&shprfnm=").append(shprfnm)
//                  .append("&shprfnmfct=").append(shprfnmfct)
//                  .append("&prfplccd=").append(prfplccd)
//                  .append("&signgucode=").append(signgucode)
//                  .append("&signgucodesub=").append(signgucodesub)
//                  .append("&kidstate=").append(kidstate)
//                  .append("&prfstate=").append(prfstate)
//                  .append("&openrun=").append(openrun)
//                  .append("&newsql=").append(newsql);
        

        try {
            URI uri = new URI(urlBuilder.toString());
            RestTemplate restTemplate = new RestTemplate();
            String xmlResponse = restTemplate.getForObject(uri, String.class);

            // XML을 JSON으로 변환
            XmlMapper xmlMapper = new XmlMapper();
            JsonNode jsonNode = xmlMapper.readTree(xmlResponse);
            String jsonResponse = jsonNode.toString();

            logger.info("API Response: {}", jsonResponse);
            return jsonResponse;
        } catch (URISyntaxException e) {
            logger.error("Invalid URI syntax", e);
            return "Error creating URI: " + e.getMessage();
        } catch (Exception e) {
            logger.error("Error fetching tour information", e);
            return "Error fetching tour information: " + e.getMessage();
        }
    }
    
 // 새로운 세부 정보 조회 엔드포인트
    @GetMapping("/reservation-detail")
    public String getTourDetail(
            @RequestParam(value = "mt20id", defaultValue = "PF132236") String mt20id,
            @RequestParam(value = "newsql", defaultValue = "Y") String newsql){

        StringBuilder urlBuilder = new StringBuilder("https://www.kopis.or.kr/openApi/restful/pblprfr/");
        urlBuilder.append(mt20id)
        			.append("?service=").append(serviceKey)
                  .append("&newsql=").append(newsql);

        try {
            URI uri = new URI(urlBuilder.toString());
            RestTemplate restTemplate = new RestTemplate();
            String xmlResponse = restTemplate.getForObject(uri, String.class);

            // XML을 JSON으로 변환
            XmlMapper xmlMapper = new XmlMapper();
            JsonNode jsonNode = xmlMapper.readTree(xmlResponse);
            String jsonResponse = jsonNode.toString();

            logger.info("API Response: {}", jsonResponse);
            return jsonResponse;
        } catch (URISyntaxException e) {
            logger.error("Invalid URI syntax", e);
            return "Error creating URI: " + e.getMessage();
        } catch (Exception e) {
            logger.error("Error fetching tour information", e);
            return "Error fetching tour information: " + e.getMessage();
        }
    }
    
    public class DateUtil {

        private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyyMMdd");

        public static String getFirstDayOfCurrentMonth() {
            return LocalDate.now().withDayOfMonth(1).format(FORMATTER);
        }

        public static String getLastDayOfNextMonth() {
            return LocalDate.now().plusMonths(1).withDayOfMonth(1).plusMonths(1).minusDays(1).format(FORMATTER);
        }
        
        @ModelAttribute("defaultStDate")
        public String defaultStDate() {
        	System.out.println(getFirstDayOfCurrentMonth());
            return getFirstDayOfCurrentMonth();
        }

        @ModelAttribute("defaultEdDate")
        public String defaultEdDate() {
            return getLastDayOfNextMonth();
        }
    }
}

