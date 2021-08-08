import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import error from 'koa-json-error';

import systemController from './controllers/system';
import workItemsController from './controllers/v1/workItems/workItems';

const App = new Koa();

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

App.use(systemController.routes());
App.use(workItemsController.routes());

App.use(async ctx => {
  ctx.throw(404);
});

export default App;
