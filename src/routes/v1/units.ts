import Router from '@koa/router';

import { UnitModel } from '../../models';
import authMiddleware from '../../middleware/auth';

const unitsRouter = new Router();
unitsRouter.prefix('/v1/units');

unitsRouter.get('/', async ctx => {
  ctx.body = await UnitModel.find({}, null);
});

unitsRouter.get('/:id', authMiddleware, async ctx => {
  const { id } = ctx.params;

  const unit = await UnitModel.findById(id).lean({ defaults: true });

  if (!unit) {
    ctx.throw(404);
  }

  ctx.body = unit;
});

unitsRouter.patch('/:id', authMiddleware, async ctx => {
  const { id } = ctx.params;
  const data = ctx.request.body;

  const unit = await UnitModel.findByIdAndUpdate(id, data);

  if (!unit) {
    ctx.throw(404);
  }

  ctx.body = await UnitModel.findById(unit._id).lean({ defaults: true });
});

unitsRouter.post('/', async ctx => {
  const data = ctx.request.body;

  const unit = new UnitModel(data);
  await unit.save();

  ctx.body = await UnitModel.findById(unit._id);
});

export default unitsRouter;
