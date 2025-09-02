package com.example.dashboard.service;

import com.example.dashboard.entity.CommissionStatus;
import com.example.dashboard.mapper.CommissionStatusMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommissionStatusService {
    
    @Autowired
    private CommissionStatusMapper commissionStatusMapper;
    
    public List<CommissionStatus> getAllCommissionStatus() {
        return commissionStatusMapper.findAll();
    }
    
    public CommissionStatus getCommissionStatusByProductType(String productType) {
        return commissionStatusMapper.findByProductType(productType);
    }
}
