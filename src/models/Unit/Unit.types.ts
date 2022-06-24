import { ObjectId, Document, PaginateModel, Types } from 'mongoose';
import { IListDocument } from '../List/List.types';
import { Fields } from '../../types/fields';

interface IUnit {
  name: string;
  project: ObjectId;
  completed: boolean;
  list: ObjectId;
  data: Record<string, unknown>;
}

export type UnitMethods = {
  updateDataFields: {
    (this: IUnitDocument, data: Record<string, unknown>): Promise<void>;
  };
};

export interface IUnitDocument extends IUnit, Document, UnitMethods {}

export type UnitStatics = {
  findByIds: {
    (this: IUnitModel, ids: string[]): Promise<IUnitDocument[]>;
  };
  createUnit: {
    (
      this: IUnitModel,
      name: string,
      project: Types.ObjectId,
      list: Types.ObjectId,
      data: Fields,
    );
  };
  moveUnits: {
    (
      this: IUnitModel,
      units: IUnitDocument[],
      list: IListDocument,
    ): Promise<unknown>;
  };
};

export interface IUnitModel extends PaginateModel<IUnitDocument>, UnitStatics {}
