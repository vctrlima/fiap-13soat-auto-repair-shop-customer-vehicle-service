#!/bin/sh
set -e

echo "Starting Customer & Vehicle Service..."

echo "Running database seed..."
node dist/seed.js

echo "Starting application..."
exec "$@"
