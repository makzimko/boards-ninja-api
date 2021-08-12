import Router from '@koa/router';
import md5 from 'md5';
import randomString from 'randomstring';

import UserModel from '../../../models/User';
import SessionModel from '../../../models/Session';
import authMiddleware from '../../../middleware/auth';

const authController = new Router();

authController.prefix('/v1/auth');

authController.get('/', authMiddleware, async ctx => {
  ctx.body = ctx.state.user;
});

authController.post('/login', async ctx => {
  const { login, password } = ctx.request.body;

  const user = await UserModel.findOne({ login }).select('password salt');

  if (!user) {
    ctx.throw(401, 'Incorrect login or password');
  }

  const encryptedPassword = md5(user.salt + password);

  if (user.password !== encryptedPassword) {
    ctx.throw(401, 'Incorrect login or password');
  }

  const session = new SessionModel({
    user: user._id,
    sessionId: randomString.generate(),
  });
  await session.save();

  ctx.cookies.set('sessionId', session.sessionId);

  ctx.body = {
    session: session.sessionId,
  };
});

export default authController;
