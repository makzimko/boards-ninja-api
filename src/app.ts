import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import error from 'koa-json-error';

import systemRouter from './routes/system';
import workItemsRouter from './routes/workItems';

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

App.use(systemRouter.routes());
App.use(workItemsRouter.routes());

App.use(async ctx => {
  ctx.body = {
    hello: 'world',
  };
});

export default App;
