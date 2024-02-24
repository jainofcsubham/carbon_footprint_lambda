import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONError, formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { v4 as uuidv4 } from "uuid";

import schema from "./schema";
import { confirmUser, deleteUser, registerUser } from "@libs/aws-cognito";
import { Database } from "@libs/database";
import { User } from "src/entities/User";

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

  const dbInstance = new Database();
  const registerRes = await registerUser({
    email,
    password,
    first_name,
    last_name,
    phone_number,
    gender,
    date_of_birth,
  });

  const confirmRes = await confirmUser({ email, password });
  if (registerRes.status == "success" && confirmRes.status == "success") {
    const connection = await dbInstance.getConnection();

    const user = new User({
      email,
      date_of_birth: new Date(date_of_birth),
      first_name,
      gender,
      last_name,
      user_id: registerRes.data?.User?.Username,
    });
    await connection.getRepository("User").save(user);
    await connection.destroy();
    return formatJSONResponse({
      message: `User created successfully`,
    });
  }
  await deleteUser(email);
  return formatJSONError({
    status: "error",
    message: "Could not create account. Please re-register.",
  });
};

export const register = middyfy(registerHandler);
