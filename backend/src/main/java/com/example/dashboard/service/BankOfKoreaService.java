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
    
    // 기준금리 통계표 코드 (한국은행 기준금리)
    private final String INTEREST_RATE_CODE = "722Y001";
    
    // 소비자물가지수 통계표 코드 (총지수)
    private final String CPI_CODE = "901Y009";
    
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
    
    // 기준금리 조회
    public List<Map<String, Object>> getInterestRates(String startDateParam, String endDateParam) {
        List<Map<String, Object>> interestRates = new ArrayList<>();
        
        // 날짜 파라미터가 있으면 사용, 없으면 기본값 (최근 12개월)
        LocalDate endDate = endDateParam != null ? 
            LocalDate.parse(endDateParam + "01", DateTimeFormatter.ofPattern("yyyyMMdd")) : 
            LocalDate.now();
        LocalDate startDate = startDateParam != null ? 
            LocalDate.parse(startDateParam + "01", DateTimeFormatter.ofPattern("yyyyMMdd")) : 
            endDate.minusMonths(12);
        
        String startDateStr = startDate.format(DateTimeFormatter.ofPattern("yyyyMM"));
        String endDateStr = endDate.format(DateTimeFormatter.ofPattern("yyyyMM"));
        
        try {
            String url = String.format("%s/%s/json/kr/1/100/%s/M/%s/%s/0101000",
                BASE_URL, apiKey, INTEREST_RATE_CODE, startDateStr, endDateStr);
            
            System.out.println("Fetching interest rate data from: " + url);
            
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            
            if (response.getBody() != null) {
                Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
                System.out.println("Interest rate API response: " + responseBody);
                
                Map<String, Object> data = (Map<String, Object>) responseBody.get("StatisticSearch");
                
                if (data != null) {
                    List<Map<String, Object>> rows = (List<Map<String, Object>>) data.get("row");
                    
                    System.out.println("Found " + (rows != null ? rows.size() : 0) + " interest rate records");
                    
                    if (rows != null) {
                        for (Map<String, Object> row : rows) {
                            System.out.println("Interest rate row: " + row);
                            String dateStr = (String) row.get("TIME");
                            String rateStr = (String) row.get("DATA_VALUE");
                            
                            if (dateStr != null && rateStr != null) {
                                Map<String, Object> interestRate = new HashMap<>();
                                interestRate.put("date", dateStr);
                                interestRate.put("rate", Double.parseDouble(rateStr));
                                interestRate.put("unit", "%");
                                interestRate.put("rateType", "한국은행 기준금리");
                                interestRate.put("description", "한국은행 기준금리 및 여수신금리");
                                interestRates.add(interestRate);
                            }
                        }
                    }
                } else {
                    System.out.println("No StatisticSearch data found in interest rate response");
                }
            }
        } catch (Exception e) {
            System.err.println("Error fetching interest rate data: " + e.getMessage());
            e.printStackTrace();
        }
        
        return interestRates;
    }
    
    // 소비자물가상승률 조회
    public List<Map<String, Object>> getConsumerPriceIndex(String startDateParam, String endDateParam) {
        List<Map<String, Object>> cpiData = new ArrayList<>();
        
        // 날짜 파라미터가 있으면 사용, 없으면 기본값 (최근 12개월)
        LocalDate endDate = endDateParam != null ? 
            LocalDate.parse(endDateParam + "01", DateTimeFormatter.ofPattern("yyyyMMdd")) : 
            LocalDate.now();
        LocalDate startDate = startDateParam != null ? 
            LocalDate.parse(startDateParam + "01", DateTimeFormatter.ofPattern("yyyyMMdd")) : 
            endDate.minusMonths(12);
        
        String startDateStr = startDate.format(DateTimeFormatter.ofPattern("yyyyMM"));
        String endDateStr = endDate.format(DateTimeFormatter.ofPattern("yyyyMM"));
        
        try {
            String url = String.format("%s/%s/json/kr/1/100/%s/M/%s/%s/0",
                BASE_URL, apiKey, CPI_CODE, startDateStr, endDateStr);
            
            System.out.println("Fetching CPI data from: " + url);
            
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            
            if (response.getBody() != null) {
                Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
                System.out.println("CPI API response: " + responseBody);
                
                Map<String, Object> data = (Map<String, Object>) responseBody.get("StatisticSearch");
                
                if (data != null) {
                    List<Map<String, Object>> rows = (List<Map<String, Object>>) data.get("row");
                    
                    System.out.println("Found " + (rows != null ? rows.size() : 0) + " CPI records");
                    
                    if (rows != null) {
                        for (Map<String, Object> row : rows) {
                            System.out.println("CPI row: " + row);
                            String dateStr = (String) row.get("TIME");
                            String cpiStr = (String) row.get("DATA_VALUE");
                            
                            if (dateStr != null && cpiStr != null) {
                                Map<String, Object> cpi = new HashMap<>();
                                cpi.put("date", dateStr);
                                cpi.put("cpi", Double.parseDouble(cpiStr));
                                cpi.put("unit", "%");
                                cpi.put("cpiType", "소비자물가지수(총지수)");
                                cpi.put("description", "국내 소비자물가지수");
                                cpiData.add(cpi);
                            }
                        }
                    }
                } else {
                    System.out.println("No StatisticSearch data found in CPI response");
                }
            }
        } catch (Exception e) {
            System.err.println("Error fetching CPI data: " + e.getMessage());
            e.printStackTrace();
        }
        
        return cpiData;
    }
}
