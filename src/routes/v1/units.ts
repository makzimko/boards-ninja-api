import Router from '@koa/router';

import { UnitModel } from '../../models';
import authMiddleware from '../../middleware/auth';
import { Types } from 'mongoose';

const defaultSelect = '-__v';
const unitsRouter = new Router();
unitsRouter.prefix('/v1/units');

unitsRouter.get('/', authMiddleware, async ctx => {
  ctx.body = await UnitModel.find({}, defaultSelect);
});

unitsRouter.get('/:id', authMiddleware, async ctx => {
  const { id } = ctx.params;

  const unit = await UnitModel.findById(id, defaultSelect).lean({
    defaults: true,
  });

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

  ctx.body = await UnitModel.findById(unit._id).lean({
    defaults: true,
    select: defaultSelect,
  });
});

unitsRouter.delete('/:id', authMiddleware, async ctx => {
  const { id } = ctx.params;

  const deleted = await UnitModel.findByIdAndDelete(id);

  if (!deleted) {
    ctx.throw(404);
  }

  ctx.statusCode = 204;
  ctx.body = undefined;
});

unitsRouter.post('/', async ctx => {
  const data = ctx.request.body;

  const unit = new UnitModel(data);
  await unit.save();

  ctx.body = await UnitModel.findById(unit._id, { select: defaultSelect });
});

unitsRouter.post('/list', async ctx => {
  const { ids } = ctx.request.body;

  ctx.body = await UnitModel.find({
    _id: { $in: ids.map(id => Types.ObjectId(id)) },
  }).lean({
    defaults: true,
    select: defaultSelect,
  });
});

export default unitsRouter;
