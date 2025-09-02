package com.example.dashboard.service;

import com.example.dashboard.entity.ProductManagement;
import com.example.dashboard.mapper.ProductManagementMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductManagementService {
    
    @Autowired
    private ProductManagementMapper productManagementMapper;
    
    public List<ProductManagement> getAllProductManagement() {
        return productManagementMapper.findAll();
    }
    
    public ProductManagement getProductManagementByName(String productName) {
        return productManagementMapper.findByProductName(productName);
    }
}
