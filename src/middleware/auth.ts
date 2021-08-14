import SessionModel from '../models/Session';

const authMiddleware = async (ctx, next) => {
  const sessionId = ctx.state.sessionId || ctx.cookies.get('sessionId');

  console.log('COOKIE_2', sessionId);

  if (!sessionId) {
    ctx.throw(401);
  }

  const session = await SessionModel.findOne({ sessionId }).populate(
    'user',
    '-salt -password',
  );

  if (!session) {
    ctx.throw(401);
  }

  ctx.state.user = session.user;

  await next();
};

export default authMiddleware;
