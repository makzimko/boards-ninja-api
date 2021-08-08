import Router from '@koa/router';
import WorkItemModel from '../../../models/WorkItem';

const workItemsController = new Router();
const defaultSelect = 'id name resolved -_id';

workItemsController.prefix('/v1/work-items');

workItemsController.get('/', async ctx => {
  ctx.body = await WorkItemModel.find()
    .select(defaultSelect)
    .lean({ defaults: true });
});

workItemsController.post('/', async ctx => {
  const data = ctx.request.body;

  const workItem = new WorkItemModel(data);
  await workItem.save();

  ctx.body = await WorkItemModel.findById(workItem._id)
    .select(defaultSelect)
    .lean({ defaults: true });
});

workItemsController.get('/:id', async ctx => {
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
  const { id } = ctx.params;
  const { id: bodyId, ...rest } = ctx.request.body;

  if (bodyId) {
    ctx.throw(400, 'Changing of work item ID is not allowed');
  }

  const workItem = await WorkItemModel.findOneAndUpdate({ id }, rest);

  if (!workItem) {
    ctx.throw(404);
  }

  ctx.body = await WorkItemModel.findById(workItem._id).select('id name -_id');
});

export default workItemsController;
