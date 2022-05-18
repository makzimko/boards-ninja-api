import Router from '@koa/router';

import { ListModel, UnitModel } from '../../models';
import authMiddleware from '../../middleware/auth';
import { Types } from 'mongoose';
import { IListDocument } from '../../models/List/List.types';

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

  await ListModel.findOneAndUpdate(
    {
      units: {
        $all: [id],
      },
    },
    {
      $pull: {
        units: {
          $in: [id],
        },
      },
    },
  );

  ctx.statusCode = 204;
  ctx.body = undefined;
});

unitsRouter.post('/', authMiddleware, async ctx => {
  const data = ctx.request.body;

  const unit = new UnitModel(data);
  await unit.save();

  ctx.body = await UnitModel.findById(unit._id, { select: defaultSelect });
});

unitsRouter.post('/list', authMiddleware, async ctx => {
  const { ids } = ctx.request.body;

  ctx.body = await UnitModel.find({
    _id: { $in: ids.map(id => Types.ObjectId(id)) },
  }).lean({
    defaults: true,
    select: defaultSelect,
  });
});

unitsRouter.post('/move', authMiddleware, async ctx => {
  const { ids, list } = ctx.request.body;

  const units = await UnitModel.findByIds(ids);
  if (units.length !== ids.length) {
    const missingUnitIds = ids.filter(
      id => !units.find(({ _id }) => _id.toString() === id),
    );

    ctx.throw(400, `Can't find units: ${missingUnitIds.join(', ')}`);
  }

  const destinationList = await ListModel.findById(list);
  if (!destinationList) {
    ctx.throw(400, `Can't find list ${list}`);
  }

  await UnitModel.moveUnits(units, destinationList);

  ctx.statusCode = 204;
  ctx.body = undefined;
});

export default unitsRouter;
