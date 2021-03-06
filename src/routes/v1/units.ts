import Router from '@koa/router';
import { Types } from 'mongoose';

import { ListModel, UnitModel } from '../../models';
import authMiddleware from '../../middleware/auth';

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
  const { project, archived, list, data, ...rest } = ctx.request.body;

  if (project) {
    ctx.throw(400, 'Changing of project directly is not allowed');
  }

  if (archived) {
    ctx.throw(400, 'Archiving of unit directly is not allowed');
  }

  if (list) {
    ctx.throw(400, 'Changing of list directly is not allowed');
  }

  if (data) {
    ctx.throw(400, 'Changing of data directly is not allowed');
  }

  const unit = await UnitModel.findById(id);

  if (unit.archived) {
    ctx.throw(400, "Archived unit can't be changed");
  }

  await unit.set(rest);
  await unit.updateDataFields();

  if (!unit) {
    ctx.throw(404);
  }

  ctx.body = await UnitModel.findById(unit._id).lean({
    defaults: true,
    select: defaultSelect,
  });
});

unitsRouter.patch('/:id/data', authMiddleware, async ctx => {
  const { id } = ctx.params;
  const data = ctx.request.body;

  const unit = await UnitModel.findById(id);

  if (!unit) {
    ctx.throw(404);
  }

  if (unit.archived) {
    ctx.throw(400, "Archived unit can't be changed");
  }

  try {
    await unit.updateDataFields(data);
  } catch (e) {
    ctx.throw(400, e.message);
  }

  ctx.body = await UnitModel.findById(id);
});

unitsRouter.delete('/:id', authMiddleware, async ctx => {
  const { id } = ctx.params;

  const unit = await UnitModel.findById(id);

  if (!unit) {
    ctx.throw(404);
  }

  if (unit.archived) {
    ctx.throw(400, "Archived unit can't be changed");
  }

  await UnitModel.findByIdAndDelete(id);

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

  const archivedUnits = units.filter(({ archived }) => archived);

  if (archivedUnits.length) {
    ctx.throw(400, `Archived units can't be moved`);
  }

  const destinationList = await ListModel.findById(list);

  if (destinationList.archived) {
    ctx.throw(400, `Can't move units to archived list`);
  }

  if (!destinationList) {
    ctx.throw(400, `Can't find list ${list}`);
  }

  await UnitModel.moveUnits(units, destinationList);

  ctx.statusCode = 204;
  ctx.body = undefined;
});

export default unitsRouter;
