import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event,context) => {
  // console.log(context);
  // const records = await db.select('*').from('User');
  // console.log(records);
  return formatJSONResponse({
    message: `Hello Subham, welcome to the exciting Serverless world!`,
    event,

  });
};

export const main = middyfy(hello);
