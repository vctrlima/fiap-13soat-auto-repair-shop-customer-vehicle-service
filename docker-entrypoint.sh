#!/bin/sh
set -e

echo "Starting Customer & Vehicle Service..."

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Database setup complete!"

echo "Starting application..."
exec "$@"
