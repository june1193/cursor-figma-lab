package com.example.dashboard.service;

import com.example.dashboard.entity.SalesPerson;
import com.example.dashboard.mapper.SalesPersonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalesPersonService {
    
    @Autowired
    private SalesPersonMapper salesPersonMapper;
    
    public List<SalesPerson> getAllSalesPersons() {
        return salesPersonMapper.findAll();
    }
    
    public SalesPerson getSalesPersonByName(String salesPersonName) {
        return salesPersonMapper.findBySalesPersonName(salesPersonName);
    }
}
