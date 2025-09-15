#!/usr/bin/env bash
set -euo pipefail

BUILD_DIR="/home/ec2-user/frontend/build"

# 권한/퍼미션 정리
chown -R ec2-user:nginx "$BUILD_DIR"
find "$BUILD_DIR" -type d -exec chmod 755 {} \;
find "$BUILD_DIR" -type f -exec chmod 644 {} \;

# Nginx reload
sudo systemctl reload nginx

# (옵션) 프론트 헬스체크
curl -sSf http://127.0.0.1/ >/dev/null || {
  echo "Frontend health check failed"
  exit 1
}
echo "Frontend deployed"
