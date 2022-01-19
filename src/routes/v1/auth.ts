import Router from '@koa/router';

const authRouter = new Router();
authRouter.prefix('/v1/auth');

authRouter.post('/login', ctx => {
  const { login, password } = ctx.request.body;

  console.log('LOGIN', login, password);
  ctx.body = 'Hello world!';
});

export default authRouter;
