// import schema from './schema';
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.getQuestions`,
  events: [
    {
      http: {
        method: "get",
        cors: true,
        path: "questions",
      },
    },
  ],
};
