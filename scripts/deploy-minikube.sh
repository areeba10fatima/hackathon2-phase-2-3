#!/bin/bash

# Script to deploy the Todo application to Minikube
# Usage: ./deploy-minikube.sh

set -e  # Exit on any error

echo "Starting deployment to Minikube..."

# Start Minikube if not already running
if ! minikube status | grep -q "Running"; then
    echo "Starting Minikube..."
    minikube start
fi

# Build Docker images
echo "Building Docker images..."
docker build -f docker/Dockerfile.frontend -t todo-frontend:latest . || { echo "Failed to build frontend image"; exit 1; }
docker build -f docker/Dockerfile.backend -t todo-backend:latest . || { echo "Failed to build backend image"; exit 1; }

# Load images into Minikube
echo "Loading images into Minikube..."
minikube image load todo-frontend:latest || { echo "Failed to load frontend image"; exit 1; }
minikube image load todo-backend:latest || { echo "Failed to load backend image"; exit 1; }

# Apply Kubernetes configurations
echo "Deploying to Kubernetes..."
kubectl apply -f kubernetes/configmap.yaml
kubectl apply -f kubernetes/secrets.yaml  # Make sure to update with your base64 encoded secrets
kubectl apply -f kubernetes/backend-deployment.yaml
kubectl apply -f kubernetes/frontend-deployment.yaml
kubectl apply -f kubernetes/hpa.yaml

echo "Deployment complete!"
echo "Access the application with:"
echo "  Frontend: $(minikube service todo-frontend-service --url)"
echo "  Backend: $(minikube service todo-backend-service --url)"

echo ""
echo "To check status:"
echo "  kubectl get pods"
echo "  kubectl get services"