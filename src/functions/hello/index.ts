import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'hello',
        cors : true,
        authorizer :{
          arn : "arn:aws:cognito-idp:ap-south-1:058264295782:userpool/ap-south-1_T8NEIqIpX"
        },
      },
    },
  ],
};
