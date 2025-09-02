package com.example.dashboard.mapper;

import com.example.dashboard.entity.SalesPerson;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SalesPersonMapper {
    
    @Select("SELECT * FROM sales_persons")
    List<SalesPerson> findAll();
    
    @Select("SELECT * FROM sales_persons WHERE sales_person_name = #{salesPersonName}")
    SalesPerson findBySalesPersonName(String salesPersonName);
}
