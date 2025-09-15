#!/usr/bin/env bash
set -euo pipefail

JAR_PATH="/home/ec2-user/app/app.jar"

# 권한/디렉토리 보장
mkdir -p /home/ec2-user/app
chown -R ec2-user:ec2-user /home/ec2-user/app

# 혹시 이전 파일 있음 백업(선택)
if [ -f "$JAR_PATH" ]; then
  cp "$JAR_PATH" "/home/ec2-user/app/app-$(date +%Y%m%d-%H%M%S).jar.bak" || true
fi

# 새 JAR이 이미 업로드되어 있다고 가정
# 서비스 재시작
sudo systemctl restart dashboard-backend

# 헬스체크 (엔드포인트 있으면 교체)
for i in {1..20}; do
  sleep 1
  if curl -sSf http://127.0.0.1:8080/actuator/health >/dev/null; then
    echo "Backend healthy"
    exit 0
  fi
done

echo "Backend health check failed"
journalctl -u dashboard-backend --no-pager -n 200
exit 1
