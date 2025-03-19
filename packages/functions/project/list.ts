import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { lambda_wrapper } from "../utils/lambda";
import { db } from "../utils/db";
import { projects } from "../utils/projects.sql";
import { z } from "zod";
import { desc, sql } from "drizzle-orm";

// Query parameters schema for pagination
const querySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(10),
  offset: z.coerce.number().min(0).default(0),
});

export const main = lambda_wrapper(
  async (event: APIGatewayProxyEvent, context: Context) => {
    // Extract and validate query parameters
    const queryParams = event.queryStringParameters || {};
    const { limit, offset } = querySchema.parse(queryParams);

    // Get all projects with pagination using Drizzle ORM
    const projectsResult = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.created_at))
      .limit(limit)
      .offset(offset)
      .execute();

    // Get total count
    const countResult = await db
      .select({ count: sql`count(*)` })
      .from(projects)
      .execute();
    const totalCount = Number(countResult[0].count);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = Math.floor(offset / limit) + 1;
    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    // Return projects with pagination metadata
    return JSON.stringify(
      {
        projects: projectsResult,
        pagination: {
          total: totalCount,
          limit,
          offset,
          currentPage,
          totalPages,
          hasNext,
          hasPrevious,
        },
      },
      null,
      2
    );
  }
);
