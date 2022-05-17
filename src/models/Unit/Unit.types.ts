import { ObjectId, Document, PaginateModel } from 'mongoose';

interface IUnit {
  name: string;
  project: ObjectId;
  completed: boolean;
}

export type UnitMethods = Record<string, unknown>;

export interface IUnitDocument extends IUnit, Document, UnitMethods {}

export type UnitStatics = {
  findByIds: {
    (this: IUnitModel, ids: string[]): Promise<IUnitDocument[]>;
  };
};

export interface IUnitModel extends PaginateModel<IUnitDocument>, UnitStatics {}
