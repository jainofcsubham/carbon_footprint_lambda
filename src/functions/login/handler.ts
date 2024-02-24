import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONError, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';


import schema from './schema';
import { loginUser } from '@libs/aws-cognito';



const loginHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const {email,password} = event.body

  const data =await  loginUser({email,password});
  if(data.status != "success"){
    return formatJSONError({
      status : "error",
      message : "Cannot login."
    })
  }
  return formatJSONResponse({
    status : "success",
    accessToken : data?.data?.AuthenticationResult?.AccessToken,
    idToken : data?.data?.AuthenticationResult?.IdToken,
    refreshToken  : data?.data?.AuthenticationResult?.RefreshToken
  });
};

export const login = middyfy(loginHandler);
