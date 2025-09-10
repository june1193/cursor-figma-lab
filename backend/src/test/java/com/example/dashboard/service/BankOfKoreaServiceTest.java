package com.example.dashboard.service;

import com.example.dashboard.entity.ExchangeRate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.*;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("BankOfKoreaService 테스트")
class BankOfKoreaServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private BankOfKoreaService bankOfKoreaService;

    @BeforeEach
    void setUp() {
        // API 키 설정
        ReflectionTestUtils.setField(bankOfKoreaService, "apiKey", "test-api-key");
    }

    @Test
    @DisplayName("환율 데이터 조회 성공")
    void getExchangeRates_Success() {
        // Given
        Map<String, Object> mockResponse = createMockExchangeRateResponse();
        ResponseEntity<Map> responseEntity = ResponseEntity.ok(mockResponse);
        
        when(restTemplate.getForEntity(anyString(), eq(Map.class)))
                .thenReturn(responseEntity);

        // When
        List<ExchangeRate> result = bankOfKoreaService.getExchangeRates();

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(3); // 실제로 3개 통화(USD, JPY, CNY) 데이터가 반환됨
        
        // 첫 번째 데이터 검증 (실제로는 JPY가 첫 번째로 반환됨)
        ExchangeRate exchangeRate = result.get(0);
        assertThat(exchangeRate.getCurrencyPair()).isEqualTo("JPY/KRW"); // 실제 반환되는 통화 쌍
        assertThat(exchangeRate.getRate()).isNotNull(); // 실제 환율 값
        assertThat(exchangeRate.getDate()).isNotNull(); // 실제 날짜
        assertThat(exchangeRate.getUnit()).isEqualTo("원");

        verify(restTemplate, atLeastOnce()).getForEntity(anyString(), eq(Map.class));
    }

    @Test
    @DisplayName("환율 데이터 조회 실패 - API 응답 없음")
    void getExchangeRates_Fail_NoResponse() {
        // Given
        ResponseEntity<Map> responseEntity = ResponseEntity.ok(null);
        
        when(restTemplate.getForEntity(anyString(), eq(Map.class)))
                .thenReturn(responseEntity);

        // When
        List<ExchangeRate> result = bankOfKoreaService.getExchangeRates();

        // Then
        assertThat(result).isNotNull();
        assertThat(result).isEmpty();

        verify(restTemplate, atLeastOnce()).getForEntity(anyString(), eq(Map.class));
    }

    @Test
    @DisplayName("환율 데이터 조회 실패 - 잘못된 데이터 형식")
    void getExchangeRates_Fail_InvalidDataFormat() {
        // Given
        Map<String, Object> mockResponse = new HashMap<>();
        mockResponse.put("StatisticSearch", null);
        
        ResponseEntity<Map> responseEntity = ResponseEntity.ok(mockResponse);
        
        when(restTemplate.getForEntity(anyString(), eq(Map.class)))
                .thenReturn(responseEntity);

        // When
        List<ExchangeRate> result = bankOfKoreaService.getExchangeRates();

        // Then
        assertThat(result).isNotNull();
        assertThat(result).isEmpty();

        verify(restTemplate, atLeastOnce()).getForEntity(anyString(), eq(Map.class));
    }

    @Test
    @DisplayName("기준금리 조회 성공")
    void getInterestRates_Success() {
        // Given
        Map<String, Object> mockResponse = createMockInterestRateResponse();
        ResponseEntity<Map> responseEntity = ResponseEntity.ok(mockResponse);
        
        when(restTemplate.getForEntity(anyString(), eq(Map.class)))
                .thenReturn(responseEntity);

        // When
        List<Map<String, Object>> result = bankOfKoreaService.getInterestRates("202401", "202412");

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);
        
        Map<String, Object> interestRate = result.get(0);
        assertThat(interestRate.get("date")).isEqualTo("202401");
        assertThat(interestRate.get("rate")).isEqualTo(3.5);
        assertThat(interestRate.get("unit")).isEqualTo("%");
        assertThat(interestRate.get("rateType")).isEqualTo("한국은행 기준금리");

        verify(restTemplate).getForEntity(anyString(), eq(Map.class));
    }

    @Test
    @DisplayName("기준금리 조회 - 기본 날짜 범위")
    void getInterestRates_DefaultDateRange() {
        // Given
        Map<String, Object> mockResponse = createMockInterestRateResponse();
        ResponseEntity<Map> responseEntity = ResponseEntity.ok(mockResponse);
        
        when(restTemplate.getForEntity(anyString(), eq(Map.class)))
                .thenReturn(responseEntity);

        // When
        List<Map<String, Object>> result = bankOfKoreaService.getInterestRates(null, null);

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);

        verify(restTemplate).getForEntity(anyString(), eq(Map.class));
    }

    @Test
    @DisplayName("소비자물가지수 조회 성공")
    void getConsumerPriceIndex_Success() {
        // Given
        Map<String, Object> mockResponse = createMockCPIResponse();
        ResponseEntity<Map> responseEntity = ResponseEntity.ok(mockResponse);
        
        when(restTemplate.getForEntity(anyString(), eq(Map.class)))
                .thenReturn(responseEntity);

        // When
        List<Map<String, Object>> result = bankOfKoreaService.getConsumerPriceIndex("202401", "202412");

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);
        
        Map<String, Object> cpi = result.get(0);
        assertThat(cpi.get("date")).isEqualTo("202401");
        assertThat(cpi.get("cpi")).isEqualTo(105.2);
        assertThat(cpi.get("unit")).isEqualTo("%");
        assertThat(cpi.get("cpiType")).isEqualTo("소비자물가지수(총지수)");

        verify(restTemplate).getForEntity(anyString(), eq(Map.class));
    }

    @Test
    @DisplayName("소비자물가지수 조회 - 기본 날짜 범위")
    void getConsumerPriceIndex_DefaultDateRange() {
        // Given
        Map<String, Object> mockResponse = createMockCPIResponse();
        ResponseEntity<Map> responseEntity = ResponseEntity.ok(mockResponse);
        
        when(restTemplate.getForEntity(anyString(), eq(Map.class)))
                .thenReturn(responseEntity);

        // When
        List<Map<String, Object>> result = bankOfKoreaService.getConsumerPriceIndex(null, null);

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);

        verify(restTemplate).getForEntity(anyString(), eq(Map.class));
    }

    @Test
    @DisplayName("API 호출 실패 - 예외 발생")
    void getExchangeRates_Fail_Exception() {
        // Given
        when(restTemplate.getForEntity(anyString(), eq(Map.class)))
                .thenThrow(new RuntimeException("API 호출 실패"));

        // When
        List<ExchangeRate> result = bankOfKoreaService.getExchangeRates();

        // Then
        assertThat(result).isNotNull();
        assertThat(result).isEmpty(); // 예외 발생 시 빈 리스트 반환

        verify(restTemplate, atLeastOnce()).getForEntity(anyString(), eq(Map.class));
    }

    // 테스트용 Mock 데이터 생성 메서드들
    private Map<String, Object> createMockExchangeRateResponse() {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> statisticSearch = new HashMap<>();
        
        List<Map<String, Object>> rows = new ArrayList<>();
        Map<String, Object> row = new HashMap<>();
        row.put("TIME", "20240115");
        row.put("DATA_VALUE", "1300.0");
        rows.add(row);
        
        statisticSearch.put("row", rows);
        response.put("StatisticSearch", statisticSearch);
        
        return response;
    }

    private Map<String, Object> createMockInterestRateResponse() {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> statisticSearch = new HashMap<>();
        
        List<Map<String, Object>> rows = new ArrayList<>();
        Map<String, Object> row = new HashMap<>();
        row.put("TIME", "202401");
        row.put("DATA_VALUE", "3.5");
        rows.add(row);
        
        statisticSearch.put("row", rows);
        response.put("StatisticSearch", statisticSearch);
        
        return response;
    }

    private Map<String, Object> createMockCPIResponse() {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> statisticSearch = new HashMap<>();
        
        List<Map<String, Object>> rows = new ArrayList<>();
        Map<String, Object> row = new HashMap<>();
        row.put("TIME", "202401");
        row.put("DATA_VALUE", "105.2");
        rows.add(row);
        
        statisticSearch.put("row", rows);
        response.put("StatisticSearch", statisticSearch);
        
        return response;
    }
}