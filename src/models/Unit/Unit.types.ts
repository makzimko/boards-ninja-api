import { ObjectId, Document, PaginateModel } from 'mongoose';
import { IListDocument } from '../List/List.types';
import { Field } from '../../types/fields';

interface IUnit {
  name: string;
  project: ObjectId;
  completed: boolean;
  list: ObjectId;
  data: Field[];
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
  moveUnits: {
    (
      this: IUnitModel,
      units: IUnitDocument[],
      list: IListDocument,
    ): Promise<unknown>;
  };
};

export interface IUnitModel extends PaginateModel<IUnitDocument>, UnitStatics {}
