import Router from '@koa/router';

const systemController = new Router();

systemController.get('/status', ctx => {
  ctx.body = {
    uptime: process.uptime(),
  };
});

export default systemController;
