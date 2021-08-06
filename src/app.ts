import Koa from 'koa';

const App = new Koa();

import systemRouter from './routes/system';

App.use(systemRouter.routes());

App.use(async ctx => {
  ctx.body = {
    hello: 'world',
  };
});

export default App;
