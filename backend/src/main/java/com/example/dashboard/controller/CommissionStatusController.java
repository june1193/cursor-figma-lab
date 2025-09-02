package com.example.dashboard.controller;

import com.example.dashboard.entity.CommissionStatus;
import com.example.dashboard.service.CommissionStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commission-status")
@CrossOrigin(origins = "*")
public class CommissionStatusController {
    
    @Autowired
    private CommissionStatusService commissionStatusService;
    
    @GetMapping
    public List<CommissionStatus> getAllCommissionStatus() {
        return commissionStatusService.getAllCommissionStatus();
    }
    
    @GetMapping("/{productType}")
    public CommissionStatus getCommissionStatusByProductType(@PathVariable String productType) {
        return commissionStatusService.getCommissionStatusByProductType(productType);
    }
}
