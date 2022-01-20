import Router from '@koa/router';

import { ProjectModel, UnitModel } from '../../models';
import authMiddleware from '../../middleware/auth';

const defaultSelect = '-_id';
const projectsRouter = new Router();
projectsRouter.prefix('/v1/projects');

projectsRouter.get('/', authMiddleware, async ctx => {
  ctx.body = await ProjectModel.find({}, null, { select: defaultSelect });
});

projectsRouter.get('/:key', async ctx => {
  const { key } = ctx.params;

  try {
    ctx.body = await ProjectModel.getByKey(key);
  } catch (e) {
    ctx.throw(404, e);
  }
});

projectsRouter.get('/:key/units', async ctx => {
  const { key } = ctx.params;

  try {
    const project = await ProjectModel.getByKey(key);

    ctx.body = await UnitModel.find({ project: project._id });
  } catch (e) {
    ctx.throw(404, e);
  }
});

projectsRouter.post('/:key/units', async ctx => {
  const { key } = ctx.params;
  const { name } = ctx.request.body;

  try {
    const project = await ProjectModel.getByKey(key);

    ctx.body = await project.createSimpleUnit(name);
  } catch (e) {
    ctx.throw(404, e);
  }
});

export default projectsRouter;
