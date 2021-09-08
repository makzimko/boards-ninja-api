import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import error from 'koa-json-error';
import cors from '@koa/cors';

import systemController from './controllers/system';
import authController from './controllers/v1/auth/controller';
import workItemsController from './controllers/v1/workItems/controller';
import tagsController from './controllers/v1/tags/controller';

const App = new Koa();

App.use(cors());
App.use(bodyParser());
App.use(
  error({
    format: ({ status, name, message }) => ({
      status,
      name,
      message,
    }),
  }),
);

App.use(authController.routes());
App.use(systemController.routes());
App.use(workItemsController.routes());
App.use(tagsController.routes());

App.use(async ctx => {
  console.log(ctx.request);
  ctx.throw(404);
});

export default App;
