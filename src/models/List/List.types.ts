import { ObjectId, Document, PaginateModel } from 'mongoose';
import { IUnitDocument } from '../Unit/Unit.types';

interface IList {
  name: string;
  project: ObjectId;
  units: ObjectId[];
  predefined: boolean;
}

export type ListMethods = {
  edit: {
    (this: IListDocument, props: Partial<IList>): Promise<void>;
  };
  removeList: {
    (this: IListDocument, destinationList: ObjectId): Promise<ObjectId[]>;
  };
};

export interface IListDocument extends IList, Document, ListMethods {}

export type IListModel = PaginateModel<IListDocument>;
