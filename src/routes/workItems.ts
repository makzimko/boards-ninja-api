import Router from '@koa/router';

import WorkItemsController from '../controllers/WorkItems';
import { WorkItem } from '../models/types';
const workItemsRouter = new Router();

workItemsRouter.prefix('/work-items');

workItemsRouter.get('/', async ctx => {
  const result = await WorkItemsController.find();
  ctx.body = result;
});

workItemsRouter.post('/', async ctx => {
  const result = await WorkItemsController.create(ctx.request.body as WorkItem);
  ctx.body = result;
});

export default workItemsRouter;
