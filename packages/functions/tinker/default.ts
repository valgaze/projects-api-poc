import { lambda_wrapper } from "./../shared";

export const main = lambda_wrapper(async (event, context) => {
  // always return JSON.stringified for api gateway
  return JSON.stringify({
    mesage: "This is the default route add params to the path.",
  });
});
