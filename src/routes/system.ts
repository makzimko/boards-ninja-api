import Router from '@koa/router';

const systemRouter = new Router();

systemRouter.get('/status', ctx => {
  ctx.body = {
    uptime: process.uptime(),
  };
});

export default systemRouter;
