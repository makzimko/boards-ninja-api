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
  ctx.throw(501);
});

export default workItemsController;
