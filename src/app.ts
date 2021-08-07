import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

const App = new Koa();

import systemRouter from './routes/system';
import workItemsRouter from './routes/workItems';

App.use(bodyParser());

App.use(systemRouter.routes());
App.use(workItemsRouter.routes());

App.use(async ctx => {
  ctx.body = {
    hello: 'world',
  };
});

export default App;
