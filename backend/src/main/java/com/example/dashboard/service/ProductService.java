package com.example.dashboard.service;

import com.example.dashboard.entity.Product;
import com.example.dashboard.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    
    @Autowired
    private ProductMapper productMapper;
    
    public List<Product> getAllProducts() {
        return productMapper.findAll();
    }
    
    public Product getProductById(Long id) {
        return productMapper.findById(id);
    }
}
