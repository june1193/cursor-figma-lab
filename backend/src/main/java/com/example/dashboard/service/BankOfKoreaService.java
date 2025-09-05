package com.example.dashboard.service;

import com.example.dashboard.entity.ExchangeRate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class BankOfKoreaService {
    
    @Value("${bank-of-korea.api-key}")
    private String apiKey;
    
    private final RestTemplate restTemplate = new RestTemplate();
    private final String BASE_URL = "https://ecos.bok.or.kr/api/StatisticSearch";
    
    // 통화 코드 매핑
    private final Map<String, String> CURRENCY_CODES = Map.of(
        "USD", "0000001",  // 미국 달러
        "JPY", "0000002",  // 일본 엔
        "CNY", "0000003"   // 중국 위안
    );
    
    public List<ExchangeRate> getExchangeRates() {
        List<ExchangeRate> exchangeRates = new ArrayList<>();
        
        // 최근 30일 데이터 가져오기
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(30);
        
        String startDateStr = startDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String endDateStr = endDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        
        for (Map.Entry<String, String> entry : CURRENCY_CODES.entrySet()) {
            String currency = entry.getKey();
            String code = entry.getValue();
            
            try {
                String url = String.format("%s/%s/json/kr/1/100/731Y001/D/%s/%s/%s",
                    BASE_URL, apiKey, startDateStr, endDateStr, code);
                
                System.out.println("Fetching data for " + currency + " from: " + url);
                
                ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
                
                if (response.getBody() != null) {
                    Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
                    Map<String, Object> data = (Map<String, Object>) responseBody.get("StatisticSearch");
                    
                    if (data != null) {
                        List<Map<String, Object>> rows = (List<Map<String, Object>>) data.get("row");
                        
                        System.out.println("Found " + (rows != null ? rows.size() : 0) + " rows for " + currency);
                        
                        if (rows != null) {
                            for (Map<String, Object> row : rows) {
                                String dateStr = (String) row.get("TIME");
                                String rateStr = (String) row.get("DATA_VALUE");
                                
                                if (dateStr != null && rateStr != null) {
                                    LocalDate date = LocalDate.parse(dateStr, DateTimeFormatter.ofPattern("yyyyMMdd"));
                                    Double rate = Double.parseDouble(rateStr);
                                    
                                    exchangeRates.add(new ExchangeRate(
                                        currency + "/KRW",
                                        rate,
                                        date,
                                        "원"
                                    ));
                                }
                            }
                        }
                    } else {
                        System.out.println("No StatisticSearch data found for " + currency + ". Response: " + responseBody);
                    }
                } else {
                    System.out.println("No data received for " + currency);
                }
            } catch (Exception e) {
                System.err.println("Error fetching data for " + currency + ": " + e.getMessage());
                e.printStackTrace();
            }
        }
        
        return exchangeRates;
    }
}
