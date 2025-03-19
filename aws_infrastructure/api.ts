import { vpc, db_postgres } from "./storage";

// Create the API - get db_postgres from global context since it's created in sst.config.ts
export const api = new sst.aws.ApiGatewayV2("ProjectsApi", {
  link: [db_postgres], // link to the Postgres DB
  vpc, // link to the VPC
});

// Add routes directly with handler paths
api.route("POST /projects", "packages/functions/project/create.main");
api.route("GET /projects/{id}", "packages/functions/project/read.main");
// api.route("GET /projects", "packages/functions/project/list.main");
api.route("DELETE /projects/{id}", "packages/functions/project/delete.main");
api.route("PUT /projects/{id}", "packages/functions/project/update.main");
api.route(
  "GET /projects/user/{userId}",
  "packages/functions/project/listById.main"
);
api.route("$default", "packages/functions/utils/default.main");

// List all w/ auth example
api.route("GET /projects", "packages/functions/project/list.main", {
  auth: { iam: true },
});
