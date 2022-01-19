import Router from '@koa/router';
import UserModel from '../../models/User';

const authRouter = new Router();
authRouter.prefix('/v1/auth');

authRouter.post('/login', async ctx => {
  const { login, password } = ctx.request.body;
  try {
    const user = await UserModel.authenticate(login, password);

    ctx.body = user._id;
  } catch (e) {
    ctx.throw(401, e);
  }
});

export default authRouter;
