import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { lambda_wrapper } from "../utils/lambda";
import { db } from "../utils/db";
import { projects } from "../utils/projects.sql";
import { updateProjectSchema } from "./schema";
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

    // Parse and validate request body
    if (!event.body) {
      throw new Error("validation error: Missing request body");
    }

    const data = JSON.parse(event.body);
    const validatedData = updateProjectSchema.parse(data);

    // Check if any fields are provided for update
    if (Object.keys(validatedData).length === 0) {
      throw new Error("validation error: No fields provided for update");
    }

    // Create update values object
    const updateValues: Record<string, any> = {};

    if (validatedData.name !== undefined)
      updateValues.name = validatedData.name;
    if (validatedData.address !== undefined)
      updateValues.address = validatedData.address;
    if (validatedData.description !== undefined)
      updateValues.description = validatedData.description;

    // Add updated_at timestamp
    updateValues.updated_at = new Date();

    // Update the project using Drizzle
    const result = await db
      .update(projects)
      .set(updateValues)
      .where(eq(projects.id, parseInt(id, 10)))
      .returning()
      .execute();

    // Check if the project exists
    if (!result || result.length === 0) {
      throw new Error(`Project with ID ${id} not found`);
    }

    // Return the updated project
    return JSON.stringify(
      {
        message: "Project updated successfully",
        project: result[0],
      },
      null,
      2
    );
  }
);
