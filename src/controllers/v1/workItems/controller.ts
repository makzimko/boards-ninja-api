import Router from '@koa/router';

import WorkItemModel from '../../../models/WorkItem';
import { validate } from '../../../utils/validation';
import { suppressIdInBody, validateIdInParams } from './validators';
import authMiddleware from '../../../middleware/auth';

const defaultSelect = 'id name resolved archived -_id';
const workItemsController = new Router();
workItemsController.prefix('/v1/work-items');
workItemsController.use(authMiddleware);

workItemsController.get('/', async ctx => {
  const {
    sortBy = 'id',
    sortOrder = 1,
    limit = 10,
    offset = 0,
  } = ctx.request.query;

  const filter = {
    archived: {
      $ne: true,
    },
  };

  const result = await WorkItemModel.paginate(filter, {
    select: defaultSelect,
    lean: {
      defaults: true,
    },
    limit,
    offset,
    sort: {
      [sortBy]: sortOrder,
    },
  });

  ctx.set('X-Total-Count', result.totalDocs);
  ctx.body = result.docs;
});

workItemsController.post('/', async ctx => {
  validate([suppressIdInBody], ctx);

  const data = ctx.request.body;

  const workItem = new WorkItemModel(data);
  await workItem.save();

  ctx.body = await WorkItemModel.findById(workItem._id)
    .select(defaultSelect)
    .lean({ defaults: true });
});

workItemsController.get('/archive', async ctx => {
  const {
    sortBy = 'id',
    sortOrder = 1,
    limit = 10,
    offset = 0,
  } = ctx.request.query;

  const filter = {
    archived: true,
  };

  const result = await WorkItemModel.paginate(filter, {
    select: defaultSelect,
    lean: {
      defaults: true,
    },
    limit,
    offset,
    sort: {
      [sortBy]: sortOrder,
    },
  });

  ctx.set('X-Total-Count', result.totalDocs);
  ctx.body = result.docs;
});

workItemsController.get('/:id', async ctx => {
  validate([validateIdInParams], ctx);

  const { id } = ctx.params;
  const workItem = await WorkItemModel.findOne({ id })
    .select(defaultSelect)
    .lean({ defaults: true });

  if (!workItem) {
    ctx.throw(404);
  }

  ctx.body = workItem;
});

workItemsController.patch('/:id', async ctx => {
  validate([validateIdInParams], ctx);

  const { id } = ctx.params;
  const { id: bodyId, ...rest } = ctx.request.body;

  if (bodyId) {
    ctx.throw(400, 'Changing of work item ID is not allowed');
  }

  const { archived } = await WorkItemModel.findOne({ id });

  if (archived) {
    ctx.throw(400, 'Updating of archived work items is not allowed');
  }

  if (rest.archived) {
    rest.resolved = true;
  }

  const workItem = await WorkItemModel.findOneAndUpdate({ id }, rest);

  if (!workItem) {
    ctx.throw(404);
  }

  ctx.body = await WorkItemModel.findById(workItem._id).select(defaultSelect);
});

export default workItemsController;
