import { lambda_wrapper } from "./../shared";

export const main = lambda_wrapper(async (event, context) => {
  // always return JSON.stringified for api gateway

  const userId =
    event.requestContext.authorizer?.iam.cognitoIdentity.identityId;

  return JSON.stringify({
    route: event.routeKey,
    booyah: "TOP SECRET BBY.",
    userId,
  });
});
