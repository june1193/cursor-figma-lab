#!/usr/bin/env bash
set -euo pipefail

echo "🚀 EC2 CI/CD 설정을 시작합니다..."

# 1. 백엔드 systemd 서비스 생성
echo "📦 백엔드 systemd 서비스 생성 중..."
sudo tee /etc/systemd/system/dashboard-backend.service >/dev/null <<'UNIT'
[Unit]
Description=Dashboard Backend
After=network.target

[Service]
User=ec2-user
WorkingDirectory=/home/ec2-user/app
ExecStart=/usr/bin/java -Dspring.profiles.active=prod -jar /home/ec2-user/app/app.jar
Restart=always
RestartSec=5
# 로그는 journald 사용: 조회는 `journalctl -u dashboard-backend -f`
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
UNIT

sudo systemctl daemon-reload
sudo systemctl enable dashboard-backend

# 2. 프론트/Nginx 경로와 권한 정리
echo "📁 프론트엔드 디렉토리 설정 중..."
sudo mkdir -p /home/ec2-user/frontend/build
sudo chown -R ec2-user:nginx /home/ec2-user/frontend
sudo find /home/ec2-user/frontend -type d -exec chmod 755 {} \;
sudo find /home/ec2-user/frontend -type f -exec chmod 644 {} \;

# 3. 배포 스크립트 권한 설정
echo "🔧 배포 스크립트 권한 설정 중..."
chmod +x /home/ec2-user/deploy/backend/deploy.sh
chmod +x /home/ec2-user/deploy/frontend/deploy.sh

# 4. Nginx 설정 확인
echo "🌐 Nginx 설정 확인 중..."
sudo nginx -t

echo "✅ EC2 CI/CD 설정이 완료되었습니다!"
echo ""
echo "📋 다음 단계:"
echo "1. GitHub 레포지토리 > Settings > Secrets and variables > Actions"
echo "2. 다음 시크릿들을 추가하세요:"
echo "   - SSH_HOST: 3.26.156.132"
echo "   - SSH_USER: ec2-user"
echo "   - SSH_KEY: EC2 접속용 개인키 내용 전체"
echo "3. main 브랜치에 푸시하여 자동 배포 테스트"
echo ""
echo "🔍 서비스 상태 확인:"
echo "sudo systemctl status dashboard-backend"
echo "sudo systemctl status nginx"
