import Router from '@koa/router';

import { ProjectModel, UnitModel } from '../../models';
import authMiddleware from '../../middleware/auth';
import projectMiddleware from '../../middleware/project';

const defaultSelect = '-_id';
const projectsRouter = new Router();

projectsRouter.prefix('/v1/projects');

projectsRouter.get('/', authMiddleware, async ctx => {
  ctx.body = await ProjectModel.find({}, null, { select: defaultSelect });
});

projectsRouter.get('/:key', authMiddleware, projectMiddleware, async ctx => {
  ctx.body = ctx.state.project;
});

projectsRouter.get(
  '/:key/units',
  authMiddleware,
  projectMiddleware,
  async ctx => {
    const project = ctx.state.project;
    ctx.body = await UnitModel.find({ project: project._id });
  },
);

projectsRouter.post(
  '/:key/units',
  authMiddleware,
  projectMiddleware,
  async ctx => {
    const { name } = ctx.request.body;
    ctx.body = await ctx.state.project.createSimpleUnit(name);
  },
);

export default projectsRouter;
