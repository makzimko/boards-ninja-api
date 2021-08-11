import { RouterContext } from 'koa-router';

export type ValidationError = string | undefined;
export type Validator = (ctx: RouterContext) => ValidationError;

export const validate = (
  validators: Array<Validator>,
  ctx: RouterContext,
): void => {
  validators.forEach(validator => {
    const error = validator(ctx);

    if (error) {
      ctx.throw(400, error);
    }
  });
};
