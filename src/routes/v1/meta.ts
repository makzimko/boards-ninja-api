import Router from '@koa/router';

import { EntityFieldDescriptions } from '../../constants/fields';

const metaRouter = new Router();
metaRouter.prefix('/v1/meta');

metaRouter.get('/description/:entity', ctx => {
  const { entity } = ctx.params;

  const entityFieldDescription = EntityFieldDescriptions[entity];

  if (!entityFieldDescription) {
    ctx.throw(404);
  }

  ctx.body = entityFieldDescription;
});

export default metaRouter;
