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

-- 샘플 데이터 삽입
INSERT INTO products (product_name, consultation_count, sales_count, commission, mtd_consultation_count, mtd_sales_count, ytd_consultation_count, ytd_sales_count) VALUES
('제품A', 120, 80, 15, 450, 320, 3200, 2800),
('제품B', 90, 60, 12, 380, 250, 2800, 2400),
('제품C', 150, 100, 18, 520, 380, 3800, 3200),
('제품D', 80, 50, 10, 320, 200, 2400, 2000),
('제품E', 200, 140, 22, 680, 480, 4200, 3600);
