import isNumber from 'lodash/isNumber';
import isUndefined from 'lodash/isUndefined';

import { Validator } from '../../../utils/validation';

export const validateIdInParams: Validator = ctx => {
  const { id } = ctx.params;

  if (!isNumber(id) && (+id).toString() !== id) {
    return 'ID should be a number';
  }
};

export const suppressIdInBody: Validator = ctx => {
  // @ts-ignore
  const { id } = ctx0.request.body;

  if (!isUndefined(id)) {
    return 'Manual set of ID is not allowed';
  }
};
