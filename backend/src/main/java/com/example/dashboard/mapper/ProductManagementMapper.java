package com.example.dashboard.mapper;

import com.example.dashboard.entity.ProductManagement;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ProductManagementMapper {
    
    @Select("SELECT * FROM products")
    List<ProductManagement> findAll();
    
    @Select("SELECT * FROM products WHERE product_name = #{productName}")
    ProductManagement findByProductName(String productName);
}
