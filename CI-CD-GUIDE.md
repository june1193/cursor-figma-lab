# 🚀 CI/CD 자동 배포 가이드

## 📋 개요

이 프로젝트는 GitHub Actions를 사용하여 자동 CI/CD를 구현합니다.

- **Frontend**: React + Vite → EC2 Nginx
- **Backend**: Spring Boot → EC2 systemd 서비스
- **배포**: Git 푸시 시 자동 빌드 및 배포

## 🎯 전체 흐름

```mermaid
graph LR
    A[Git Push] --> B[GitHub Actions]
    B --> C[Build Frontend]
    B --> D[Build Backend]
    C --> E[Deploy to EC2]
    D --> E
    E --> F[Health Check]
    F --> G[Success/Failure]
```

## 🛠️ 사전 준비

### 1. EC2 설정 (1회만 실행)

```bash
# EC2에 접속 후
chmod +x deploy/setup-ec2.sh
./deploy/setup-ec2.sh
```

### 2. GitHub 시크릿 설정

GitHub 레포지토리 > Settings > Secrets and variables > Actions

| 시크릿 이름 | 값 | 설명 |
|------------|-----|------|
| `SSH_HOST` | `3.26.156.132` | EC2 퍼블릭 IP |
| `SSH_USER` | `ec2-user` | EC2 사용자명 |
| `SSH_KEY` | `-----BEGIN PRIVATE KEY-----...` | EC2 접속용 개인키 |

## 🚀 사용 방법

### 자동 배포

```bash
# main 브랜치에 푸시하면 자동 배포
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin main
```

### 수동 배포

```bash
# 백엔드만 배포
./deploy/backend/deploy.sh

# 프론트엔드만 배포
./deploy/frontend/deploy.sh
```

## 📁 파일 구조

```
.github/workflows/
├── backend.yml      # 백엔드 CI/CD
└── frontend.yml     # 프론트엔드 CI/CD

deploy/
├── backend/deploy.sh    # 백엔드 배포 스크립트
├── frontend/deploy.sh   # 프론트엔드 배포 스크립트
├── setup-ec2.sh         # EC2 초기 설정
└── README.md            # 상세 가이드
```

## 🔍 모니터링

### 서비스 상태

```bash
# 백엔드 서비스
sudo systemctl status dashboard-backend

# Nginx
sudo systemctl status nginx

# 백엔드 로그
sudo journalctl -u dashboard-backend -f
```

### 헬스체크

```bash
# 백엔드
curl http://127.0.0.1:8080/actuator/health

# 프론트엔드
curl http://127.0.0.1/
```

## ⚙️ 설정 상세

### 백엔드 설정

- **JAR 파일**: `dashboard-backend-1.0.0.jar` → `app.jar`로 이름 변경
- **서비스**: `dashboard-backend.service` (systemd)
- **포트**: 8080
- **헬스체크**: `/actuator/health`

### 프론트엔드 설정

- **빌드 경로**: `frontend/build/`
- **배포 경로**: `/home/ec2-user/frontend/build/`
- **웹서버**: Nginx
- **헬스체크**: `/`

## 🛠️ 트러블슈팅

### 자주 발생하는 문제

1. **SSH 연결 실패**
   - 시크릿 키 확인
   - EC2 보안 그룹 SSH(22) 포트 확인

2. **백엔드 배포 실패**
   - JAR 파일 존재 확인: `ls -la /home/ec2-user/app/`
   - 서비스 로그 확인: `sudo journalctl -u dashboard-backend -n 50`

3. **프론트엔드 배포 실패**
   - 파일 권한 확인: `ls -la /home/ec2-user/frontend/build/`
   - Nginx 설정 확인: `sudo nginx -t`

## 📚 추가 정보

- [상세 배포 가이드](deploy/README.md)
- [GitHub Actions 워크플로우](.github/workflows/)
- [EC2 설정 스크립트](deploy/setup-ec2.sh)
