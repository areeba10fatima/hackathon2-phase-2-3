# Quickstart Guide: Phase IV Local Cloud-Native Deployment

## Prerequisites

- Docker installed and running
- Minikube installed (v1.28 or higher)
- kubectl installed
- Helm installed (v3.x)
- Base64 utility for encoding secrets

## Quick Deployment Steps

### 1. Start Minikube
```bash
minikube start --memory=8192 --cpus=4
```

### 2. Build Docker Images
```bash
# Build frontend image
docker build -f docker/Dockerfile.frontend -t todo-frontend:latest .

# Build backend image
docker build -f docker/Dockerfile.backend -t todo-backend:latest .
```

### 3. Load Images into Minikube
```bash
minikube image load todo-frontend:latest
minikube image load todo-backend:latest
```

### 4. Encode and Configure Secrets
```bash
# Example for encoding secrets
export DATABASE_URL_B64=$(echo -n "your-database-url" | base64)
export BETTER_AUTH_SECRET_B64=$(echo -n "your-auth-secret" | base64)
export OPENAI_API_KEY_B64=$(echo -n "your-openai-key" | base64)
export JWT_SECRET_B64=$(echo -n "your-jwt-secret" | base64)
```

Update the secrets files with your encoded values:
- `kubernetes/secrets.yaml`
- `helm/backend/values.yaml`

### 5. Deploy with Kubernetes Manifests
```bash
# Apply all manifests
kubectl apply -f kubernetes/
```

### 6. Or Deploy with Helm Charts
```bash
# Install Helm releases
helm install todo-backend-release helm/backend
helm install todo-frontend-release helm/frontend
```

### 7. Access the Application
```bash
# Get frontend service URL
minikube service todo-frontend-service --url
```

## Verification Commands

```bash
# Check pods
kubectl get pods

# Check services
kubectl get services

# Check deployments
kubectl get deployments

# Check logs for any pod
kubectl logs <pod-name>
```

## Clean Up

```bash
# Uninstall Helm releases
helm uninstall todo-backend-release
helm uninstall todo-frontend-release

# Or delete Kubernetes resources
kubectl delete -f kubernetes/

# Stop Minikube
minikube stop
```

## AI-Assisted Operations

```bash
# Deploy with kubectl-ai
kubectl-ai "deploy todo frontend with 2 replicas"

# Scale with kubectl-ai
kubectl-ai "scale backend deployment to 3 replicas"

# Check status with kubectl-ai
kubectl-ai "show me the status of all pods"

# Analyze with kagent
kagent "analyze cluster health"

# Optimize with kagent
kagent "optimize resource allocation"
```

## Troubleshooting

**Issue**: Images not found in Minikube
**Solution**: Ensure you ran `minikube image load` after building

**Issue**: Secrets not decoded properly
**Solution**: Verify base64 encoding/decoding of secrets

**Issue**: Frontend can't connect to backend
**Solution**: Verify service names and network connectivity between pods