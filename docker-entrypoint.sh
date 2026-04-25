#!/bin/sh
set -e

echo "Starting Customer & Vehicle Service..."

echo "Syncing database schema..."
npx prisma db push --accept-data-loss

echo "Running database seed..."
node dist/seed.js

echo "Starting application..."
exec "$@"
