package com.example.dashboard.mapper;

import com.example.dashboard.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ProductMapper {
    
    @Select("SELECT * FROM products")
    List<Product> findAll();
    
    @Select("SELECT * FROM products WHERE id = #{id}")
    Product findById(Long id);
}
