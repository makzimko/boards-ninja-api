import Router from '@koa/router';

import WorkItemsController from '../controllers/WorkItems';
import { WorkItem } from '../models/types';
const workItemsRouter = new Router();

workItemsRouter.prefix('/work-items');

workItemsRouter.get('/', async ctx => {
  ctx.body = await WorkItemsController.find();
});

workItemsRouter.post('/', async ctx => {
  ctx.body = await WorkItemsController.create(ctx.request.body as WorkItem);
});

workItemsRouter.get('/:id', async ctx => {
  ctx.throw(401);
});

export default workItemsRouter;
