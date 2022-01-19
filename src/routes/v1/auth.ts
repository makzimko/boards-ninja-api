import Router from '@koa/router';

import { UserModel, SessionModel } from '../../models';
import authMiddleware from '../../middleware/auth';

const authRouter = new Router();
authRouter.prefix('/v1/auth');

authRouter.get('/', authMiddleware, ctx => {
  ctx.body = ctx.state.user;
});

authRouter.post(
  '/login',
  async (ctx, next) => {
    const { login, password } = ctx.request.body;
    try {
      const user = await UserModel.authenticate(login, password);
      const session = await SessionModel.generate(user._id);

      ctx.cookies.set('sessionId', session.sessionId, {
        expires: new Date(9999999999 + Date.now()),
      });
      ctx.state.sessionId = session.sessionId;

      await next();
    } catch (e) {
      ctx.throw(401, e);
    }
  },
  authMiddleware,
  ctx => {
    ctx.body = ctx.state.user;
  },
);

export default authRouter;
