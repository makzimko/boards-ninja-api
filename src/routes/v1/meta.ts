import Router from '@koa/router';

import { EntityFieldDescriptions } from '../../constants/fields';
import { UserModel } from '../../models';

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

metaRouter.get('/options/:entity', async ctx => {
  const users = await UserModel.find({}, 'name');

  ctx.body = {
    user: users,
  };
});

metaRouter.get('/:entity', async ctx => {
  const { entity } = ctx.params;
  const entityFieldDescription = EntityFieldDescriptions[entity];

  if (!entityFieldDescription) {
    ctx.throw(404);
  }

  const users = (await UserModel.find({}, 'name')).map(({ _id: id, name }) => ({
    id,
    name,
  }));

  ctx.body = {
    fields: entityFieldDescription,
    options: {
      user: users,
    },
  };
});

export default metaRouter;
