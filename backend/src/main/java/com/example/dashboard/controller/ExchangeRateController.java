package com.example.dashboard.controller;

import com.example.dashboard.entity.ExchangeRate;
import com.example.dashboard.service.BankOfKoreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exchange-rates")
@CrossOrigin(origins = "http://localhost:3000")
public class ExchangeRateController {
    
    @Autowired
    private BankOfKoreaService bankOfKoreaService;
    
    @GetMapping
    public List<ExchangeRate> getExchangeRates() {
        return bankOfKoreaService.getExchangeRates();
    }
    
    @GetMapping("/interest-rates")
    public List<Map<String, Object>> getInterestRates(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        return bankOfKoreaService.getInterestRates(startDate, endDate);
    }
    
    @GetMapping("/cpi")
    public List<Map<String, Object>> getConsumerPriceIndex(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        return bankOfKoreaService.getConsumerPriceIndex(startDate, endDate);
    }
}
