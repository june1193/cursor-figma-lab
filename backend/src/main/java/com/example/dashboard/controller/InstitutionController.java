package com.example.dashboard.controller;

import com.example.dashboard.entity.Institution;
import com.example.dashboard.service.InstitutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/institutions")
@CrossOrigin(origins = "*")
public class InstitutionController {
    
    @Autowired
    private InstitutionService institutionService;
    
    @GetMapping
    public List<Institution> getAllInstitutions() {
        return institutionService.getAllInstitutions();
    }
    
    @GetMapping("/{institutionName}")
    public Institution getInstitutionByName(@PathVariable String institutionName) {
        return institutionService.getInstitutionByName(institutionName);
    }
}
