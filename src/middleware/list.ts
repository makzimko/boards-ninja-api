import { Middleware } from 'koa';

import { ListModel } from '../models';

const listMiddleware: Middleware = async (ctx, next) => {
  const { id } = ctx.params;

  try {
    ctx.state.list = await ListModel.findById(id);
  } catch (e) {
    ctx.throw(402, e);
  }

  await next();
};

export default listMiddleware;
