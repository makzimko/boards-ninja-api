import Router from '@koa/router';
import authMiddleware from '../../../middleware/auth';
import TagModel from '../../../models/Tag';

const defaultSelect = 'name';

const tagsController = new Router();
tagsController.prefix('/v1/tags');
tagsController.use(authMiddleware);

tagsController.get('/', async ctx => {
  ctx.body = await TagModel.find()
    .select(defaultSelect)
    .lean({ defaults: true });
});

tagsController.post('/', async ctx => {
  const data = ctx.request.body;

  const tag = new TagModel(data);
  await tag.save();

  ctx.body = await TagModel.findById(tag._id)
    .select(defaultSelect)
    .lean({ defaults: true });
});

export default tagsController;
