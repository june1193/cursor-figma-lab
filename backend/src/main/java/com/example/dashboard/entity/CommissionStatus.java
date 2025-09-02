package com.example.dashboard.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommissionStatus {
    private Long id;
    private String productType;
    private Integer commission;
    private Integer mtdCommission;
    private Integer ytdCommission;
}
