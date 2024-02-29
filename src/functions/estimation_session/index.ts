// import schema from './schema';
import { handlerPath } from "@libs/handler-resolver";

export const  getQuestions = {
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

export const saveSession =  {
  handler: `${handlerPath(__dirname)}/handler.saveSession`,
  events: [
    {
      http: {
        method: "post",
        cors: true,
        path: "save-session",
      },
    },
  ],
};

export const userSession =  {
  handler: `${handlerPath(__dirname)}/handler.userSession`,
  events: [
    {
      http: {
        method: "post",
        cors: true,
        path: "user-session",
      },
    },
  ],
};