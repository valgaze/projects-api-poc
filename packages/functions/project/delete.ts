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
    // Validate path parameters
    if (!event.pathParameters || !event.pathParameters.id) {
      throw new Error("validation error: Missing project ID");
    }

    const { id } = paramsSchema.parse(event.pathParameters);

    // First, verify the project exists
    const checkResult = await db
      .select()
      .from(projects)
      .where(eq(projects.id, parseInt(id, 10)))
      .execute();

    // Check if any row was returned
    if (!checkResult || checkResult.length === 0) {
      throw new Error(`Project with ID ${id} not found`);
    }

    // Delete the project using Drizzle syntax
    await db
      .delete(projects)
      .where(eq(projects.id, parseInt(id, 10)))
      .execute();

    // Return success message
    return JSON.stringify(
      {
        message: `Project with ID ${id} deleted successfully`,
      },
      null,
      2
    );
  }
);
