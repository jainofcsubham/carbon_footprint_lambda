import {
  AdminCreateUserCommand,
  AdminCreateUserCommandInput,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  AdminSetUserPasswordCommand,
  AdminSetUserPasswordCommandInput,
  AdminDeleteUserCommand,
  AdminDeleteUserCommandInput
} from "@aws-sdk/client-cognito-identity-provider";

const cognito = new CognitoIdentityProviderClient({ region: "ap-south-1" });
const ClientId = "25vd22rsos2oeksglcrrll6623";
const UserPoolId = "ap-south-1_a6uRy0VxX";

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const params: InitiateAuthCommandInput = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  const command = new InitiateAuthCommand(params);
  try {
    const data = await cognito.send(command);
    return {
      status: "success",
      data,
    };
  } catch (e) {
    return {
      status: "error",
      message: "Something went wrong!!",
      body: e,
    };
  }
};

export const registerUser = async ({
  email,
  password,
  first_name,
  last_name,
  date_of_birth,
  phone_number,
  gender,
}: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
  gender: string;
}) => {
  const params: AdminCreateUserCommandInput = {
    UserPoolId,
    Username: email,
    TemporaryPassword: password,

    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "given_name",
        Value: first_name,
      },
      {
        Name: "family_name",
        Value: last_name,
      },
      {
        Name: "birthdate",
        Value: date_of_birth,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
      // Need to fix this.
      // {
      //   Name: 'phone_number',
      //   Value: phone_number
      // },
      {
        Name: "gender",
        Value: gender,
      },
    ],
  };

  const command = new AdminCreateUserCommand(params);
  try {
    const data = await cognito.send(command);
    return {
      status: "success",
      data,
    };
  } catch (e) {
    return {
      status: "error",
      message: "Something went wrong!!",
      body: e,
    };
  }
};

export const confirmUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const params: AdminSetUserPasswordCommandInput = {
    Username: email,
    Password: password,
    UserPoolId,
    Permanent: true,
  };

  const command = new AdminSetUserPasswordCommand(params);
  try {
    const data = cognito.send(command);
    return {
      status: "success",
      body: data,
    };
  } catch (e) {
    return {
      status: "error",
      message: "Something went wrong!!",
      body: e,
    };
  }
};

export const deleteUser = (email : string) => {
  const params: AdminDeleteUserCommandInput = {
    Username : email,
    UserPoolId,
  };

  const command = new AdminDeleteUserCommand(params);
  try {
    const data = cognito.send(command);
    return {
      status: "success",
      body: data,
    };
  } catch (e) {
    return {
      status: "error",
      message: "Something went wrong!!",
      body: e,
    };
  }

}
