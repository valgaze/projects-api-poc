import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { lambda_wrapper } from "./lambda";

export const main = lambda_wrapper(
  async (event: APIGatewayProxyEvent, context: Context) => {
    return JSON.stringify({
      message: "Default route hit",
      path: event.path,
      method: event.httpMethod,
    });
  }
);
