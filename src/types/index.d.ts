import { PaginateOptions, PaginateResult } from 'mongoose';

declare module 'mongoose' {
  type LeanOption =
    | boolean
    | {
        defaults: boolean;
      };

  interface OwnPaginateOptions extends Omit<PaginateOptions, 'lean'> {
    lean: LeanOption;
  }

  interface PaginateModel<T> extends Model<T> {
    paginate(
      query?: FilterQuery<T>,
      options?: OwnPaginateOptions,
      callback?: (err: any, result: PaginateResult<T>) => void,
    ): Promise<PaginateResult<T>>;
  }
}
