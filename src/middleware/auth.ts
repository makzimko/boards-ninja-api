const authMiddleware = async (ctx, next) => {
  const sessionId = ctx.cookies.get('sessionId');

  console.log('SES', sessionId);
  if (!sessionId) {
    ctx.throw(401);
  }

  await next();
};

export default authMiddleware;
