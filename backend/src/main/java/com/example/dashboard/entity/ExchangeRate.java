package com.example.dashboard.entity;

import java.time.LocalDate;

public class ExchangeRate {
    private Long id;
    private String currencyPair;  // USD/KRW, JPY/KRW, CNY/KRW, EUR/KRW
    private Double rate;          // 환율 값 (1달러 = 1,359원)
    private LocalDate date;       // 날짜
    private String unit;          // 단위 (원)
    private LocalDate createdAt;
    
    // 생성자
    public ExchangeRate() {}
    
    public ExchangeRate(String currencyPair, Double rate, LocalDate date, String unit) {
        this.currencyPair = currencyPair;
        this.rate = rate;
        this.date = date;
        this.unit = unit;
        this.createdAt = LocalDate.now();
    }
    
    // Getter, Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getCurrencyPair() { return currencyPair; }
    public void setCurrencyPair(String currencyPair) { this.currencyPair = currencyPair; }
    
    public Double getRate() { return rate; }
    public void setRate(Double rate) { this.rate = rate; }
    
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    
    public LocalDate getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }
}
