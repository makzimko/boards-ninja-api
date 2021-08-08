import Router from '@koa/router';
import WorkItemModel from '../../../models/WorkItem';

const workItemsController = new Router();

workItemsController.prefix('/v1/work-items');

workItemsController.get('/', async ctx => {
  ctx.body = await WorkItemModel.find().select('id name -_id');
});

workItemsController.post('/', async ctx => {
  const data = ctx.request.body;

  const result = await WorkItemModel.create(data);

  ctx.body = WorkItemModel.findById(result._id).seect('id name -_id');
});

workItemsController.get('/:id', async ctx => {
  const { id } = ctx.params;
  const workItem = await WorkItemModel.findOne({ id }).select('id name -_id');

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
