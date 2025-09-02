package com.example.dashboard.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    private Long id;
    private String productName;
    private Integer consultationCount;
    private Integer salesCount;
    private Integer commission;
    private Integer mtdConsultationCount;
    private Integer mtdSalesCount;
    private Integer ytdConsultationCount;
    private Integer ytdSalesCount;
}
