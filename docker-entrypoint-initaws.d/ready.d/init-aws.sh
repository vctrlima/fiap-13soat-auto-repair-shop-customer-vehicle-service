#!/bin/bash
# MiniStack init script — creates SNS topics and SQS queues for local development
set -e

ENDPOINT="http://localhost:4566"
REGION="us-east-2"
ACCOUNT="000000000000"

echo "Creating SNS topics..."
aws --endpoint-url=$ENDPOINT --region=$REGION sns create-topic --name work-order-events
aws --endpoint-url=$ENDPOINT --region=$REGION sns create-topic --name payment-events
aws --endpoint-url=$ENDPOINT --region=$REGION sns create-topic --name execution-events

echo "SNS topics created."
