import { lambda_wrapper } from "./../shared";

export const main = lambda_wrapper(async (event, context) => {
  // always return JSON.stringified for api gateway
  return JSON.stringify({
    route: event.routeKey,
    booyah: "woot api working.",
  });
});
