import { ObjectId, Document, PaginateModel } from 'mongoose';

interface IUnit {
  name: string;
  project: ObjectId;
}

export type UnitMethods = Record<string, unknown>;

export interface IUnitDocument extends IUnit, Document, UnitMethods {}

export type IUnitModel = PaginateModel<IUnitDocument>;
