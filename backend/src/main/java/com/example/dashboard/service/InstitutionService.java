package com.example.dashboard.service;

import com.example.dashboard.entity.Institution;
import com.example.dashboard.mapper.InstitutionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstitutionService {
    
    @Autowired
    private InstitutionMapper institutionMapper;
    
    public List<Institution> getAllInstitutions() {
        return institutionMapper.findAll();
    }
    
    public Institution getInstitutionByName(String institutionName) {
        return institutionMapper.findByInstitutionName(institutionName);
    }
}
