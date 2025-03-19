# Projects Management API

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ or Bun
- AWS CLI configured with appropriate credentials

### Installation

If you don't AWS credentials available on ~/.aws/credentials create a `.env` in the root of this project like this

```sh
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
```

### Development Workflow

```bash
# Install dependencies
npm install


# Start local development with live reload
npm run dev

# In another terminal, generate database migration based on packages/functions/utils/projects.sql.ts
npm run db generate

# Apply database migrations
npm run db migrate

# Launch Drizzle Studio UI for database interaction
npm run db studio
```

### Deployment Stages

```bash
# Deploy to development environment
npm run deploy:dev

# Deploy to staging environment
npm run deploy:staging

# Deploy to production environment
npm run deploy:prod
```

## 🔥 Key Features

- **PostgreSQL Database**: Robust data storage with full CRUD operations
- **Multi-environment Deployments**: Separate dev, staging, and production environments
- **Drizzle ORM**: Type-safe database access with migration support
- **Drizzle Studio UI**: Visual database interaction and management
- **Live Reload Development**: Edit code with instant feedback
- **Local Development Options**: Connect to local PostgreSQL for offline development

## 📋 API Examples

### Create a Project

```bash
curl -X POST https://rier9ztyfe.execute-api.us-east-1.amazonaws.com/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Office Building Renovation",
    "address": "123 Main Street, Cityville",
    "description": "Complete renovation of a 3-story office building including electrical, plumbing, and HVAC upgrades."
  }'
```

### List All Projects

```bash
curl -X GET https://rier9ztyfe.execute-api.us-east-1.amazonaws.com/projects
```

## 📚 API Endpoints

| Method | Endpoint              | Description                         |
| ------ | --------------------- | ----------------------------------- |
| POST   | /projects             | Create a new project                |
| GET    | /projects             | List all projects (with pagination) |
| GET    | /projects/{projectId} | Get a specific project by ID        |
| PUT    | /projects/{projectId} | Update an existing project          |
| DELETE | /projects/{projectId} | Delete a project                    |

## 🔧 Using a Local PostgreSQL Database

For offline development, you can connect to a local PostgreSQL database, see here for details: https://sst.dev/docs/component/aws/postgres/#running-locally

## 📁 Project Structure

```

├── aws_infrastructure/ # AWS infrastructure definitions
├── packages/
│ └── functions/ # Lambda functions
│ ├── project/ # Project-related endpoints
│ └── utils/ # Shared utilities
├── migrations/ # Drizzle migrations
└── sst.config.ts # SST configuration

```

## ⚙️ Additional Commands

```bash
# Run Drizzle Studio for database management
npm run db studio

# Generate TypeScript types from database schema
npm run db generate

# Create a new migration
npm run db push
```

### 📘 Resources + Docs

- https://sst.dev/docs/start/aws/drizzle/
- https://github.com/sst/sst/tree/dev/examples/aws-apig-auth
- https://github.com/sst/sst/tree/dev/examples/aws-aurora-postgres
- https://sst.dev/docs/iam-credentials/
- https://sst.dev/docs/share-across-stages/

### Costs 🏦

- https://calculator.aws/#/
- https://www.reddit.com/r/aws/comments/1bcp7dq/cost_for_an_aurora_cluster/

For more detailed information on API usage, see the [API Documentation](./docs/api.md).
