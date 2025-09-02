package com.example.dashboard.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Institution {
    private Long id;
    private String institutionName;
    private Integer consultationCount;
    private Integer salesCount;
    private Integer commission;
    private Integer mtdConsultationCount;
    private Integer mtdSalesCount;
    private Integer mtdCommission;
    private Integer ytdConsultationCount;
    private Integer ytdSalesCount;
    private Integer ytdCommission;
}
