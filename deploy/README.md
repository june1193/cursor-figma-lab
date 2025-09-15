# CI/CD 배포 가이드

## 🚀 전체 흐름

1. **Git 푸시** (main 브랜치)
2. **CI** (빌드 & 테스트)
   - Frontend: `npm ci && npm run build`
   - Backend: `mvn -B -ntp -f backend/pom.xml package`
3. **CD** (배포)
   - Frontend: `build/` 폴더를 EC2 `/home/ec2-user/frontend/build/`로 업로드
   - Backend: `target/*.jar`를 EC2 `/home/ec2-user/app/app.jar`로 업로드
4. **서버 재시작**
   - Nginx reload
   - Backend systemd 서비스 재시작
5. **헬스체크** & 실패 시 처리

## 📋 사전 준비 (EC2에서 1회 실행)

### 1. EC2 설정 스크립트 실행

```bash
# EC2에 접속 후
chmod +x deploy/setup-ec2.sh
./deploy/setup-ec2.sh
```

### 2. GitHub 시크릿 설정

GitHub 레포지토리 > Settings > Secrets and variables > Actions > New repository secret

- **SSH_HOST**: `3.26.156.132`
- **SSH_USER**: `ec2-user`
- **SSH_KEY**: EC2 접속용 개인키 내용 전체 (`-----BEGIN ~ END-----`)

## 🔧 파일 구조

```
.github/workflows/
├── backend.yml      # 백엔드 CI/CD 워크플로우
└── frontend.yml     # 프론트엔드 CI/CD 워크플로우

deploy/
├── backend/
│   └── deploy.sh    # 백엔드 배포 스크립트
├── frontend/
│   └── deploy.sh    # 프론트엔드 배포 스크립트
├── setup-ec2.sh     # EC2 초기 설정 스크립트
└── README.md        # 이 파일
```

## 🚀 사용 방법

### 자동 배포 (GitHub Actions)

```bash
# main 브랜치에 푸시하면 자동으로 배포됩니다
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

## 🔍 모니터링

### 서비스 상태 확인

```bash
# 백엔드 서비스 상태
sudo systemctl status dashboard-backend

# Nginx 상태
sudo systemctl status nginx

# 백엔드 로그 확인
sudo journalctl -u dashboard-backend -f
```

### 헬스체크

```bash
# 백엔드 헬스체크
curl http://127.0.0.1:8080/actuator/health

# 프론트엔드 헬스체크
curl http://127.0.0.1/
```

## 🛠️ 트러블슈팅

### 백엔드 배포 실패

1. 로그 확인: `sudo journalctl -u dashboard-backend -n 50`
2. JAR 파일 확인: `ls -la /home/ec2-user/app/`
3. 포트 확인: `sudo netstat -tlnp | grep 8080`

### 프론트엔드 배포 실패

1. Nginx 로그 확인: `sudo journalctl -u nginx -n 50`
2. 파일 권한 확인: `ls -la /home/ec2-user/frontend/build/`
3. Nginx 설정 확인: `sudo nginx -t`

## 📝 참고사항

- JAR 파일명은 `app.jar`로 통일하여 관리 편의성 향상
- 백업은 덮어쓰기 방식 (연습 목적)
- 헬스체크는 `/actuator/health` 엔드포인트 사용
- 실패 시 자동 롤백은 현재 미구현 (수동 처리)
