import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { v4 as uuidv4 } from "uuid";
import schema from "./schema";
import { Database } from "@libs/database";
import { getUserIdFromToken } from "@libs/decode-id-token";
import { EstimationSession } from "src/entities/Estimation_Session";
import { EstimationSessionDetail } from "src/entities/Estimation_Session_Detail";
import moment from "moment";

const getQuestionsHandler: ValidatedEventAPIGatewayProxyEvent<{}> = async (
  _event
) => {
  const dbInstance = new Database();
  const connection = await dbInstance.getConnection();

  const data = await connection
    .getRepository("Category")
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.questions", "questions")
    .leftJoinAndSelect("questions.options", "options")
    .orderBy("category.ordering", "ASC")
    .getMany();

  return formatJSONResponse({
    data,
    count: data.length,
  });
};

const saveSessionHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const userId = getUserIdFromToken(event.headers.Authorization);
  const { end_date, start_date, answers } = event.body;
  const dbInstance = new Database();
  const connection = await dbInstance.getConnection();
  const sessionId = uuidv4();

  // Validate dates
  // Validate question_ids

  console.log(moment(end_date, "DD/MM/YYYY").toDate(), "END");
  console.log(moment(start_date, "DD/MM/YYYY").toDate(), "STARt");

  const session: EstimationSession = {
    session_id: sessionId,
    end_date: moment(end_date, "DD/MM/YYYY").toDate(),
    start_date: moment(start_date, "DD/MM/YYYY").toDate(),
    created_on: new Date(),
    user_id: userId,
  };

  const details: ReadonlyArray<EstimationSessionDetail> = answers.map(
    (answer) => {
      return {
        question_id: answer.question_id,
        session_id: sessionId,
        value: answer.answer,
      };
    }
  );

  await connection.manager.transaction(async (transaction) => {
    await transaction.getRepository("Estimation_Session").save(session);
    await Promise.all(
      details.map((each) => {
        return transaction
          .getRepository("Estimation_Session_Detail")
          .save(each);
      })
    );
  });

  connection.destroy();
  return formatJSONResponse({});
};

const userSessionHandler: ValidatedEventAPIGatewayProxyEvent<{}> = async (
  event
) => {
  const userId = getUserIdFromToken(event.headers.Authorization);
  // Fetch user sessions
  return formatJSONResponse({});
};

export const getQuestions = middyfy(getQuestionsHandler);
export const saveSession = middyfy(saveSessionHandler);
export const userSession = middyfy(userSessionHandler);
