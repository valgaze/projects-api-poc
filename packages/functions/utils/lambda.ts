import { Context, APIGatewayProxyEvent } from "aws-lambda";

// Util to wrap lambda functions to return http responses
export function lambda_wrapper(
  lambda: (evt: APIGatewayProxyEvent, context: Context) => Promise<string>
) {
  return async function (event: APIGatewayProxyEvent, context: Context) {
    let body: string, statusCode: number;

    try {
      // Run the Lambda
      body = await lambda(event, context);
      statusCode = 200;
    } catch (error) {
      console.error("Error in lambda function:", error);

      if (error instanceof Error) {
        if (error.message.includes("not found")) {
          statusCode = 404;
        } else if (error.message.includes("validation")) {
          statusCode = 400;
        } else {
          statusCode = 500;
        }
      } else {
        statusCode = 500;
      }

      body = JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      });
    }

    // Return HTTP response
    return {
      body,
      statusCode,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  };
}
