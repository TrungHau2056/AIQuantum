#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo "==> Working directory: $PWD"

# --- Kiểm tra các tệp bắt buộc của ops-loop ---
MISSING=0
for f in CLAUDE.md feature_list.json claude-progress.md init.sh; do
  if [ ! -f "$f" ]; then
    echo "    [THIẾU] $f"
    MISSING=1
  else
    echo "    [OK] $f"
  fi
done
if [ "$MISSING" = "1" ]; then
  echo "==> Có tệp bắt buộc bị thiếu. Xem CLAUDE.md phần 'Tệp bắt buộc'."
fi

# --- Kiểm tra git ---
if [ -d .git ]; then
  echo "==> Git branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '?')"
  echo "==> Commit gần nhất: $(git log --oneline -1 2>/dev/null || echo 'không có commit')"
else
  echo "==> Cảnh báo: không phải git repo."
fi

# --- Dependency / verify / start ---
# Next.js app trong web/ (Stage 1 demo). Backend Python = Stage 2 (chưa có).
INSTALL_CMD=(npm --prefix web install)
VERIFY_CMD=(npm --prefix web run build)
START_CMD=(npm --prefix web run dev)

if [ ${#INSTALL_CMD[@]} -gt 0 ]; then
  echo "==> Syncing dependencies"
  "${INSTALL_CMD[@]}"
else
  echo "==> Chưa cấu hình dependency (INSTALL_CMD trống). Bỏ qua."
fi

if [ ${#VERIFY_CMD[@]} -gt 0 ]; then
  echo "==> Running baseline verification"
  "${VERIFY_CMD[@]}"
else
  echo "==> Chưa có baseline verification (VERIFY_CMD trống). Bỏ qua."
fi

if [ ${#START_CMD[@]} -gt 0 ]; then
  echo "==> Startup command:"
  printf '    %q' "${START_CMD[@]}"
  printf '\n'
  if [ "${RUN_START_COMMAND:-0}" = "1" ]; then
    echo "==> Starting the app"
    exec "${START_CMD[@]}"
  fi
  echo "Set RUN_START_COMMAND=1 if you want init.sh to launch the app directly."
else
  echo "==> Chưa có startup command (START_CMD trống). Bỏ qua."
fi
