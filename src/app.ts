import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import error from 'koa-json-error';
import cors from '@koa/cors';

import systemRouter from './routes/system';
import authRouter from './routes/v1/auth';

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

App.use(systemRouter.routes());
App.use(authRouter.routes());

App.use(async ctx => {
  ctx.throw(404);
});

export default App;
