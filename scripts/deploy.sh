#!/usr/bin/env bash
#
# Update the app on the VM to the latest `master` and restart it.
#
# Run by .github/workflows/deploy.yml over SSH on every push to master, or by
# hand:  bash /var/www/wfrlee-blog/scripts/deploy.sh
#
# `git pull --ff-only` refuses to run if the server copy has local edits —
# never edit files on the server; change them in git and push instead.
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
	echo "[deploy] .env is missing in $(pwd). Create it from .env.example first." >&2
	exit 1
fi

echo "[deploy] pulling latest master"
git pull --ff-only origin master

echo "[deploy] installing dependencies"
npm ci --no-audit --no-fund

echo "[deploy] building"
npm run build

echo "[deploy] restarting"
pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save

echo "[deploy] done: $(git rev-parse --short HEAD)"
