import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import error from 'koa-json-error';
import cors from '@koa/cors';

import systemRouter from './routes/system';
import authRouter from './routes/v1/auth';
import projectsRouter from './routes/v1/projects';
import unitsRouter from './routes/v1/units';
import listsRouter from './routes/v1/lists';
import metaRouter from './routes/v1/meta';

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
App.use(projectsRouter.routes());
App.use(unitsRouter.routes());
App.use(listsRouter.routes());
App.use(metaRouter.routes());

App.use(async ctx => {
  ctx.throw(404);
});

export default App;
