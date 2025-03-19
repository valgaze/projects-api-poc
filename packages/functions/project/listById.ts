import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { lambda_wrapper } from "../utils/lambda";
import { db } from "../utils/db";
import { projects } from "../utils/projects.sql";
import { z } from "zod";
import { eq } from "drizzle-orm";

// Validate path parameters
const paramsSchema = z.object({
  projectId: z.string().uuid("Invalid project ID format"),
});

export const main = lambda_wrapper(
  async (event: APIGatewayProxyEvent, context: Context) => {
    // Validate path parameters
    if (!event.pathParameters || !event.pathParameters.projectId) {
      throw new Error("validation error: Missing project ID");
    }

    const { projectId } = paramsSchema.parse(event.pathParameters);

    // Get the project by ID using Drizzle syntax
    const result = await db
      .select()
      .from(projects)
      .where(eq(projects.id, parseInt(projectId, 10)))
      .execute();

    // Check if the project exists
    if (!result || result.length === 0) {
      throw new Error(`Project with ID ${projectId} not found`);
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
