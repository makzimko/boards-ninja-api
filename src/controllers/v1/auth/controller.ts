import Router from '@koa/router';
import md5 from 'md5';
import randomString from 'randomstring';

import UserModel from '../../../models/User';
import SessionModel from '../../../models/Session';

const authController = new Router();

authController.prefix('/auth');

authController.post('/login', async ctx => {
  const { login, password } = ctx.request.body;

  const user = await UserModel.findOne({ login }).select('password salt');

  console.log('login', login, user);
  if (!user) {
    ctx.throw(401, 'Incorrect login or password');
  }

  const encryptedPassword = md5(user.salt + password);

  if (user.password !== encryptedPassword) {
    ctx.throw(401, 'Incorrect login or password');
  }

  const session = new SessionModel({
    login,
    sessionId: randomString.generate(),
  });
  await session.save();

  ctx.cookies.set('sessionId', session.sessionId);

  ctx.body = {
    session: session.sessionId,
  };
});

export default authController;
