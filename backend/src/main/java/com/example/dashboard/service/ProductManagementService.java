package com.example.dashboard.service;

import com.example.dashboard.entity.ProductManagement;
import com.example.dashboard.exception.CustomExceptions;
import com.example.dashboard.mapper.ProductManagementMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductManagementService {
    
    private static final Logger logger = LoggerFactory.getLogger(ProductManagementService.class);
    
    @Autowired
    private ProductManagementMapper productManagementMapper;
    
    public List<ProductManagement> getAllProductManagement() {
        try {
            List<ProductManagement> result = productManagementMapper.findAll();
            if (result == null || result.isEmpty()) {
                logger.warn("No product management data found");
                return result; // 빈 리스트 반환
            }
            return result;
        } catch (DataAccessException e) {
            logger.error("Database error while fetching all product management data", e);
            throw new CustomExceptions.DatabaseException("제품별 판매현황 데이터를 조회하는 중 오류가 발생했습니다.", e);
        } catch (Exception e) {
            logger.error("Unexpected error while fetching all product management data", e);
            throw new CustomExceptions.DatabaseException("제품별 판매현황 데이터 조회 중 예상치 못한 오류가 발생했습니다.", e);
        }
    }
    
    public ProductManagement getProductManagementByName(String productName) {
        if (productName == null || productName.trim().isEmpty()) {
            throw new IllegalArgumentException("제품명은 필수입니다.");
        }
        
        try {
            ProductManagement result = productManagementMapper.findByProductName(productName);
            if (result == null) {
                throw new CustomExceptions.DataNotFoundException("제품명 '" + productName + "'에 해당하는 데이터를 찾을 수 없습니다.");
            }
            return result;
        } catch (DataAccessException e) {
            logger.error("Database error while fetching product management data for: {}", productName, e);
            throw new CustomExceptions.DatabaseException("제품별 판매현황 데이터를 조회하는 중 오류가 발생했습니다.", e);
        } catch (CustomExceptions.DataNotFoundException e) {
            throw e; // 재던지기
        } catch (Exception e) {
            logger.error("Unexpected error while fetching product management data for: {}", productName, e);
            throw new CustomExceptions.DatabaseException("제품별 판매현황 데이터 조회 중 예상치 못한 오류가 발생했습니다.", e);
        }
    }
}
