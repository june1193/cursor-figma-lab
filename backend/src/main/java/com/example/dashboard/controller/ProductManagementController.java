package com.example.dashboard.controller;

import com.example.dashboard.entity.ProductManagement;
import com.example.dashboard.service.ProductManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-management")
@CrossOrigin(origins = "*")
public class ProductManagementController {
    
    @Autowired
    private ProductManagementService productManagementService;
    
    @GetMapping
    public List<ProductManagement> getAllProductManagement() {
        return productManagementService.getAllProductManagement();
    }
    
    @GetMapping("/{productName}")
    public ProductManagement getProductManagementByName(@PathVariable String productName) {
        return productManagementService.getProductManagementByName(productName);
    }
}
