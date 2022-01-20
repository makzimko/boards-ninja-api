import Router from '@koa/router';

import { UnitModel } from '../../models';

const unitsRouter = new Router();
unitsRouter.prefix('/v1/units');

unitsRouter.get('/', async ctx => {
  ctx.body = await UnitModel.find({}, null);
});

unitsRouter.post('/', async ctx => {
  const data = ctx.request.body;

  const unit = new UnitModel(data);
  await unit.save();

  ctx.body = await UnitModel.findById(unit._id);
});

export default unitsRouter;
