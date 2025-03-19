# Sample CURL Requests for Project API

Below are example curl commands for the project API endpoints.

## List projects

```
curl -X GET https://deployed_url.execute-api.us-east-1.amazonaws.com/projects

# with pagination
curl -X GET https://deployed_url.execute-api.us-east-1.amazonaws.com/projects?limit=5&offset=10
```

## Create Project

```sh


curl -X POST https://deployed_url.execute-api.us-east-1.amazonaws.com/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Office Building Renovation",
    "address": "123 Main Street, Cityville",
    "description": "Complete renovation of a 3-story office building including electrical, plumbing, and HVAC upgrades."
  }'


```

## List All Projects

```bash
# Basic list with default pagination (limit=10, offset=0)
curl -X GET https://api.example.com/projects

# With pagination parameters
curl -X GET "https://api.example.com/projects?limit=5&offset=10"
```

## Get Project By ID

```bash
# Get a specific project by its ID
curl -X GET https://api.example.com/projects/550e8400-e29b-41d4-a716-446655440000
```

## Update Project

```bash
curl -X PUT https://api.example.com/projects/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Office Building Renovation",
    "description": "Complete renovation with additional sustainable features"
  }'
```

## Delete Project

```bash
curl -X DELETE https://api.example.com/projects/550e8400-e29b-41d4-a716-446655440000
```

## API Endpoints Summary

| Method | Endpoint              | Description                                  |
| ------ | --------------------- | -------------------------------------------- |
| POST   | /projects             | Create a new project                         |
| GET    | /projects             | List all projects (with optional pagination) |
| GET    | /projects/{projectId} | Get a specific project by ID                 |
| PUT    | /projects/{projectId} | Update an existing project                   |
| DELETE | /projects/{projectId} | Delete a project                             |
