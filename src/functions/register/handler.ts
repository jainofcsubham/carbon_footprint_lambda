import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONError, formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import { confirmUser, deleteUser, registerUser } from "@libs/aws-cognito";

const registerHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const {
    email,
    password,
    first_name,
    last_name,
    phone_number,
    gender,
    date_of_birth,
  } = event.body;
  const data = await registerUser({
    email,
    password,
    first_name,
    last_name,
    phone_number,
    gender,
    date_of_birth,
  });
  const data2 = await confirmUser({ email, password });
  if (data.status == "success" && data2.status == "success") {
    return formatJSONResponse({
      message: `User created successfully`,
    });
  }
  await deleteUser(email);
  return formatJSONError({}, "Couldn't create account.");
};

export const register = middyfy(registerHandler);
