import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { lambda_wrapper } from "../utils/lambda";
import { db } from "../utils/db";
import { projects } from "../utils/projects.sql";
import { z } from "zod";
import { eq } from "drizzle-orm";

// Validate path parameters
const paramsSchema = z.object({
  id: z.string().uuid("Invalid project ID format"),
});

export const main = lambda_wrapper(
  async (event: APIGatewayProxyEvent, context: Context) => {
    if (!event.pathParameters || !event.pathParameters.id) {
      throw new Error("validation error: Missing project ID");
    }

    // Validate path parameters
    const { id } = paramsSchema.parse(event.pathParameters);

    // Get the project by ID using Drizzle
    const result = await db
      .select()
      .from(projects)
      .where(eq(projects.id, parseInt(id)))
      .execute();

    // Check if the project exists
    if (result.length === 0) {
      throw new Error(`Project with ID ${id} not found`);
    }

    // Return the project
    return JSON.stringify(
      {
        project: result[0],
      },
      null,
      2
    );
  }
);
