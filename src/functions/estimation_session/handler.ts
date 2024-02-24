import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { Database } from '@libs/database';



const getQuestionsHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (_event) => {
  const dbInstance = new Database();
  const connection = await dbInstance.getConnection();

  const data = await connection.getRepository("Category")
  .createQueryBuilder("category")
  .leftJoinAndSelect('category.questions','questions')
  .leftJoinAndSelect('questions.options','options')
  .orderBy('category.ordering','ASC')
  .getMany();
  
  return formatJSONResponse({
    data,
    count:data.length
  });
};

export const getQuestions = middyfy(getQuestionsHandler);

