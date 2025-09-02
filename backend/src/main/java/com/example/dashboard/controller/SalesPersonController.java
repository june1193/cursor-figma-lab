package com.example.dashboard.controller;

import com.example.dashboard.entity.SalesPerson;
import com.example.dashboard.service.SalesPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales-persons")
@CrossOrigin(origins = "*")
public class SalesPersonController {
    
    @Autowired
    private SalesPersonService salesPersonService;
    
    @GetMapping
    public List<SalesPerson> getAllSalesPersons() {
        return salesPersonService.getAllSalesPersons();
    }
    
    @GetMapping("/{salesPersonName}")
    public SalesPerson getSalesPersonByName(@PathVariable String salesPersonName) {
        return salesPersonService.getSalesPersonByName(salesPersonName);
    }
}
