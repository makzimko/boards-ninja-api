import { ObjectId, Document, PaginateModel } from 'mongoose';

interface IList {
  name: string;
  project: ObjectId;
  units: ObjectId[];
  predefined: boolean;
}

export type ListMethods = Record<string, unknown>;

export interface IListDocument extends IList, Document, ListMethods {}

export type IListModel = PaginateModel<IListDocument>;
