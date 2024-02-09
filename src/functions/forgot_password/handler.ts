import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {CognitoIdentityProviderClient,InitiateAuthCommand} from '@aws-sdk/client-cognito-identity-provider'

import schema from './schema';

const client = new CognitoIdentityProviderClient({ region: 'YOUR_REGION' });


const forgotPasswordHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (_event) => {

  
  return formatJSONResponse({
    message: `Hello Subham, welcome to the exciting Serverless world!`,
  });
};

export const forgotPassword = middyfy(forgotPasswordHandler);
