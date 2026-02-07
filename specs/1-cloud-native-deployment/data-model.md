# Data Model: Phase IV Local Cloud-Native Deployment

## Kubernetes Resources

### Deployment
- **apiVersion**: apps/v1
- **kind**: Deployment
- **metadata**: name, labels, annotations
- **spec**: replicas, selector, template, containers, resources, env, volumes, probes
- **Relationships**: Associated with Service via label selectors

### Service
- **apiVersion**: v1
- **kind**: Service
- **metadata**: name, labels
- **spec**: selector, ports, type (ClusterIP, NodePort, LoadBalancer)
- **Relationships**: Connects to Pods via label selectors

### ConfigMap
- **apiVersion**: v1
- **kind**: ConfigMap
- **metadata**: name, labels
- **data**: key-value pairs for non-sensitive configuration
- **Relationships**: Referenced by Pods via volume mounts or environment variables

### Secret
- **apiVersion**: v1
- **kind**: Secret
- **metadata**: name, labels
- **type**: Opaque
- **data**: base64 encoded sensitive configuration
- **Relationships**: Referenced by Pods via volume mounts or environment variables

### HorizontalPodAutoscaler
- **apiVersion**: autoscaling/v2
- **kind**: HorizontalPodAutoscaler
- **metadata**: name, labels
- **spec**: scaleTargetRef, minReplicas, maxReplicas, metrics
- **Relationships**: Controls scaling of Deployments

## Helm Chart Components

### Chart.yaml
- **apiVersion**: v2
- **name**: Chart name
- **description**: Brief description
- **type**: application
- **version**: Chart version
- **appVersion**: Application version

### values.yaml
- **replicaCount**: Number of pod replicas
- **image**: repository, pullPolicy, tag
- **service**: type, port
- **resources**: requests and limits for CPU/memory
- **secrets**: Encoded sensitive data
- **config**: Non-sensitive configuration
- **autoscaling**: Enable/disable with parameters

### Templates Structure
- **deployment.yaml**: Deployment manifest template
- **service.yaml**: Service manifest template
- **secrets.yaml**: Secret manifest template
- **_helpers.tpl**: Helper functions and labels
- **autoscaling.yaml**: HPA manifest template (optional)

## Docker Image Configuration

### Environment Variables
- **DATABASE_URL**: Connection string for PostgreSQL database
- **BETTER_AUTH_SECRET**: Secret key for Better Auth JWT signing
- **OPENAI_API_KEY**: API key for OpenAI services
- **JWT_SECRET**: Secret for JWT token verification
- **NEXT_PUBLIC_BACKEND_URL**: Backend service URL for frontend

### Dockerfile Layers
- **Base stage**: Minimal OS with dependencies
- **Dependencies stage**: Language-specific package installation
- **Build stage**: Application compilation/build
- **Production stage**: Runtime environment with application

## Service Communication Model

### Internal Communication
- Frontend → Backend communication via Kubernetes service DNS
- Service discovery through Kubernetes DNS resolution
- Environment variable configuration for service endpoints

### External Access
- Frontend service exposed via NodePort for external access
- Backend service typically ClusterIP (internal only)
- Load balancer configuration possible for production scenarios

## Security Configuration

### Network Security
- Pod-to-pod communication via internal services
- Service mesh optional but not required for local deployment
- Network policies (advanced feature, not mandatory)

### Secret Management
- Kubernetes Secrets for sensitive data
- Environment variable injection from secrets
- Base64 encoding for secret values in manifests