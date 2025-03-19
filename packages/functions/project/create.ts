import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { lambda_wrapper } from "../utils/lambda";
import { db } from "../utils/db";
import { projects } from "../utils/projects.sql";
import { createProjectSchema } from "./schema";

export const main = lambda_wrapper(
  async (event: APIGatewayProxyEvent, context: Context) => {
    // Parse and validate the request body
    if (!event.body) {
      throw new Error("validation error: Missing request body");
    }

    const data = JSON.parse(event.body);
    // Use Zod to validate the input
    const validatedData = createProjectSchema.parse(data);

    // Insert the new project using Drizzle's fluent syntax
    const result = await db
      .insert(projects)
      .values({
        name: validatedData.name,
        address: validatedData.address || null,
        description: validatedData.description || null,
      })
      .returning()
      .execute();

    // Return the created project
    return JSON.stringify(
      {
        message: "Project created successfully",
        project: result[0],
      },
      null,
      2
    );
  }
);
