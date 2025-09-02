package com.example.dashboard.mapper;

import com.example.dashboard.entity.CommissionStatus;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CommissionStatusMapper {
    
    @Select("SELECT * FROM commission_status")
    List<CommissionStatus> findAll();
    
    @Select("SELECT * FROM commission_status WHERE product_type = #{productType}")
    CommissionStatus findByProductType(String productType);
}
