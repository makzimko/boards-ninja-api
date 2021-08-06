import Router from '@koa/router';

const systemRouter = new Router();

systemRouter.get('/status', ctx => {
  console.log('status');
  ctx.body = {
    uptime: process.uptime(),
  };
});

export default systemRouter;
