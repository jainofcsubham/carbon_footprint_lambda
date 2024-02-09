import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.forgotPassword`,
  events: [
    {
      http: {
        method: 'post',
        cors : true,
        path: 'forgot-password',
        
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
