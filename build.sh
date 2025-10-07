#!/bin/bash
PUBLISHER=appe233
docker buildx build --push --platform linux/amd64,linux/arm64 -t $PUBLISHER/sexual-repression-calculator:latest .