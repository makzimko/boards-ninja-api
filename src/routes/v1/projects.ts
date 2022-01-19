import Router from '@koa/router';

import { ProjectModel } from '../../models';
import authMiddleware from '../../middleware/auth';

const defaultSelect = '-_id';
const projectsRouter = new Router();
projectsRouter.prefix('/v1/projects');

projectsRouter.get('/', authMiddleware, async ctx => {
  ctx.body = await ProjectModel.find({}, null, { select: defaultSelect });
});

export default projectsRouter;
