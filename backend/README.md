# 대시보드 백엔드

Spring Boot + MyBatis + MySQL을 사용한 대시보드 백엔드 API입니다.

## 🚀 기술 스택

- **Java** `17`
- **Spring Boot** `3.2.0`
- **MyBatis** `3.0.3`
- **MySQL** `8.0.33`
- **Maven** - 빌드 도구

## 🛠️ 시작하기

### 1. MySQL 데이터베이스 설정

```sql
-- MySQL에 접속하여 실행
source src/main/resources/sql/schema.sql
```

### 2. 애플리케이션 실행

```bash
# Maven으로 실행
mvn spring-boot:run

# 또는 JAR 파일로 실행
mvn clean package
java -jar target/dashboard-backend-1.0.0.jar
```

### 3. API 테스트

- **서버 주소**: `http://localhost:8080`
- **제품 목록**: `GET /api/products`
- **제품 상세**: `GET /api/products/{id}`

## 📊 API 엔드포인트

### 제품 관련
- `GET /api/products` - 모든 제품 조회
- `GET /api/products/{id}` - 특정 제품 조회

## 🗄️ 데이터베이스

- **호스트**: localhost:3306
- **데이터베이스**: myproject
- **사용자**: root
- **비밀번호**: dnjswns98!

## 📁 프로젝트 구조

```
src/main/java/com/example/dashboard/
├── DashboardApplication.java    # 메인 애플리케이션
├── controller/                  # REST 컨트롤러
├── service/                     # 비즈니스 로직
├── mapper/                      # MyBatis 매퍼
└── entity/                      # 엔티티 클래스
```
