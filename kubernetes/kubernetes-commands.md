# Kubernetes Commands

- Running a k8s config file:

```bash
kubectl apply -f [YOUR_CONFIG_FILE]
```

## Pods

- Execute a command in a running pod:

```bash
kubectl exec -it [POD_NAME] [CMD]
```

- Open a shell in a pod:

```bash
kubectl exec -it [POD_NAME] sh
```

- Delete a pod:

```bash
kubectl delete pod [POD_NAME]
```

- Print information about a pod:

```bash
kubectl describe pod [POD_NAME]
```

- Print logs of a pod:

```bash
kubectl logs [POD_NAME]
```

- List all running pods:

```bash
kubectl get pods
```

## Deployments

- List all running deployments:

```bash
kubectl get deployments
```

- Print out details about a specific deployment:

```bash
kubectl describe deployment [DEPL_NAME]
```

- Delete a deployment:

```bash
kubectl delete deployment [DEPL_NAME]
```

## Services

Types of services in kubernetes:

- **Cluster IP**: Sets-up an easy to remember URL to access a pod. Only exposes pods in the cluster.
- **Node Port**: Makes a pod accessable outside the cluster. Usually only used for dev purposes.
- **Load Balancer**: Makes a pod accessable from outside the cluster. This is the right way to expose a pod to the outside world.
- **External Name**: Redirects an in-cluster request to a CNAME url.

- List all running services:

```bash
kubectl get services
```

- Get all services inside of a specific namespace:

```bash
kubectl get services -n [NAMESPACE]
```

## Secrets

- Create a secret:

```bash
kubectl create secret generic [SECRET_NAME] --from-literal=YOUR_ENV_VARIABLE=your-env-value
```

- Get all secrets:

```bash
kubectl get secrets
```

## Namespaces

- Get all namespaces:

```bash
kubectl get namespace
```

To reach another service in another namespace use `http://[NAME_OF_SERVICE].[NAME_OF_NAMESPACE].svc.cluster.local`

Alternatively you can use an **External Name Service** to route the the domains without using such a complicated domain like it is displayed above.
