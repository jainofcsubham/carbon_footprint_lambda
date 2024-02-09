import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.register`,
  events: [
    {
      http: {
        method: 'post',
        path: 'register',
        cors : true,
        // authorizer :{
        //   arn : "arn:aws:cognito-idp:ap-south-1:721497630731:userpool/ap-south-1_a6uRy0VxX"
        // },
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
