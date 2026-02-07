#!/bin/bash

# Script to check the status of the Todo application deployment
# Usage: ./check-deployment.sh

echo "Checking deployment status..."

echo ""
echo "=== Pods ==="
kubectl get pods

echo ""
echo "=== Services ==="
kubectl get services

echo ""
echo "=== Deployments ==="
kubectl get deployments

echo ""
echo "=== Horizontal Pod Autoscalers ==="
kubectl get hpa

echo ""
echo "=== Secrets ==="
kubectl get secrets

echo ""
echo "=== ConfigMaps ==="
kubectl get configmaps

echo ""
echo "Minikube Dashboard URL: $(minikube dashboard --url)"