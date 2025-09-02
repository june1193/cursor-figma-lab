-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS myproject;

USE myproject;

-- 제품 테이블 생성
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    consultation_count INT DEFAULT 0,
    sales_count INT DEFAULT 0,
    commission INT DEFAULT 0,
    mtd_consultation_count INT DEFAULT 0,
    mtd_sales_count INT DEFAULT 0,
    ytd_consultation_count INT DEFAULT 0,
    ytd_sales_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 샘플 데이터 삽입 (프론트엔드 더미데이터 기반)
INSERT INTO products (product_name, consultation_count, sales_count, commission, mtd_consultation_count, mtd_sales_count, ytd_consultation_count, ytd_sales_count) VALUES
('CMA Type1', 45, 38, 350, 1350, 1140, 16200, 13680),
('CMA Type2', 28, 22, 280, 840, 660, 10080, 7920),
('CMA Type3', 35, 28, 420, 1050, 840, 12600, 10080),
('CMA Type4', 42, 35, 180, 1260, 1050, 15120, 12600),
('CMA Type5', 38, 30, 450, 1140, 900, 13680, 10800);
