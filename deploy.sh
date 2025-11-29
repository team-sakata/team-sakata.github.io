#!/bin/bash
set -e

cd /var/www/sklab_homepage

# 最新を取得
git fetch origin main
git reset --hard origin/main

# 依存関係とビルド
npm ci
npm run build

# 必要なら nginx reload（基本は不要）
# sudo systemctl reload nginx
