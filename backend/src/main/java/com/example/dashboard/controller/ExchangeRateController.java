package com.example.dashboard.controller;

import com.example.dashboard.entity.ExchangeRate;
import com.example.dashboard.service.BankOfKoreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
