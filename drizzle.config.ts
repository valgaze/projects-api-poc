import { Resource } from "sst";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  // Pick up all our schema files
  schema: ["./packages/**/*.sql.ts"],
  out: "./migrations",
  dbCredentials: {
    ssl: {
      rejectUnauthorized: false,
    },
    host: Resource.db_postgres.host,
    port: Resource.db_postgres.port,
    user: Resource.db_postgres.username,
    password: Resource.db_postgres.password,
    database: Resource.db_postgres.database,
  },
});
