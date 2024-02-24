import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const forgotPasswordHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (_event) => {
  return formatJSONResponse({
    message: `Hello Subham, welcome to the exciting Serverless world!`,
  });
};

export const forgotPassword = middyfy(forgotPasswordHandler);
