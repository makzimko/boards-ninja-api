import { Middleware } from 'koa';

import { ProjectModel } from '../models';

const projectMiddleware: Middleware = async (ctx, next) => {
  const { key } = ctx.params;

  try {
    ctx.state.project = await ProjectModel.getByKey(key);
  } catch (e) {
    ctx.throw(404, e);
  }

  await next();
};

export default projectMiddleware;
