import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.verifyEmail`,
  events: [
    {
      http: {
        method: 'post',
        path: 'verify-email',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
