# Phase IV: Local Cloud-Native Deployment Guide

This guide provides instructions for deploying the Todo AI Chatbot application using Kubernetes (Minikube) with containerization.

## Prerequisites

- Docker installed and running
- Minikube installed
- kubectl installed
- Helm installed (optional, for Helm charts)
- Base64 utility for encoding secrets

## Setup Steps

### 1. Start Minikube

```bash
minikube start
```

### 2. Build Docker Images

First, navigate to the project root and build the Docker images:

```bash
# Build frontend image
docker build -f docker/Dockerfile.frontend -t todo-frontend:latest .

# Build backend image
docker build -f docker/Dockerfile.backend -t todo-backend:latest
```

### 3. Load Images into Minikube

```bash
# Load frontend image
minikube image load todo-frontend:latest

# Load backend image
minikube image load todo-backend:latest
```

### 4. Prepare Secrets

Encode your secrets in base64 format:

```bash
# Example for encoding secrets
echo -n 'your-database-url' | base64
echo -n 'your-auth-secret' | base64
echo -n 'your-openai-api-key' | base64
echo -n 'your-jwt-secret' | base64
```

Then update the Kubernetes secrets file with the encoded values:

```bash
# Edit the secrets file with your base64 encoded values
vim kubernetes/secrets.yaml
```

### 5. Deploy using Kubernetes Manifests

Apply all the Kubernetes manifests:

```bash
# Apply ConfigMap
kubectl apply -f kubernetes/configmap.yaml

# Apply Secrets (after updating with your encoded values)
kubectl apply -f kubernetes/secrets.yaml

# Apply backend deployment and service
kubectl apply -f kubernetes/backend-deployment.yaml

# Apply frontend deployment and service
kubectl apply -f kubernetes/frontend-deployment.yaml

# Apply HPA if desired
kubectl apply -f kubernetes/hpa.yaml
```

### 6. Deploy using Helm Charts (Alternative)

If you prefer using Helm charts:

```bash
# Update secrets in Helm values files with your base64 encoded values
vim helm/backend/values.yaml

# Install backend chart
helm install todo-backend-release helm/backend

# Install frontend chart
helm install todo-frontend-release helm/frontend
```

### 7. Verify Deployment

Check that all pods are running:

```bash
kubectl get pods
kubectl get services
```

### 8. Access the Application

Get the Minikube IP and access the application:

```bash
minikube ip
# Then access via NodePort (frontend service uses NodePort type)
minikube service todo-frontend-service --url
```

## AI-Assisted Operations

The deployment supports AI-assisted DevOps operations:

### Using kubectl-ai
```bash
kubectl-ai "deploy todo frontend with 2 replicas"
kubectl-ai "scale backend deployment to handle more load"
kubectl-ai "show me the status of all pods"
```

### Using Kagent
```bash
kagent "analyze cluster health"
kagent "optimize resource allocation"
kagent "check for potential issues in deployments"
```

### Using Docker AI Agent (Gordon)
```bash
gordon "optimize Dockerfile for smaller image size"
gordon "suggest improvements to Docker security"
```

## Local Testing with Docker Compose

For local testing without Kubernetes:

```bash
# Set up environment variables in a .env file
cp .env.example .env
# Edit .env with your actual values

# Run with docker-compose
docker-compose -f docker/docker-compose.yml up -d
```

## Cleanup

To stop and remove all resources:

```bash
# If using Kubernetes manifests:
kubectl delete -f kubernetes/

# If using Helm:
helm uninstall todo-backend-release
helm uninstall todo-frontend-release

# Stop Minikube
minikube stop
```

## Troubleshooting

1. **Image Pull Issues**: Make sure images are loaded into Minikube using `minikube image load`
2. **Secrets Not Found**: Verify base64 encoding and secret names match references
3. **Service Unavailable**: Check pod status with `kubectl get pods` and logs with `kubectl logs <pod-name>`
4. **Resource Limits**: Adjust requests and limits in deployment files as needed

## Security Best Practices

- Never commit actual secrets to version control
- Use Kubernetes Secrets for sensitive data
- Implement proper RBAC (Role-Based Access Control)
- Regular security scanning of container images
- Network policies to restrict traffic between services