import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Resource } from "sst";
import * as schema from "./projects.sql";

const pool = new Pool({
  host: Resource.db_postgres.host,
  // host: Resource.db_postgres.proxyHost, // Use the Proxy host instead

  port: Resource.db_postgres.port,
  user: Resource.db_postgres.username,
  password: Resource.db_postgres.password,
  database: Resource.db_postgres.database,
});

export const db = drizzle(pool, { schema });
