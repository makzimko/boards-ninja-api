import { ObjectId, Document, PaginateModel } from 'mongoose';

interface IList {
  name: string;
  project: ObjectId;
  units: ObjectId[];
  predefined: boolean;
  archived: boolean;
}

export type ListMethods = {
  edit: {
    (this: IListDocument, props: Partial<IList>): Promise<void>;
  };
  archive: {
    (this: IListDocument, destinationList?: ObjectId): Promise<{
      archived: ObjectId[];
      moved: ObjectId[];
    }>;
  };
  removeList: {
    (this: IListDocument, destinationList: ObjectId): Promise<ObjectId[]>;
  };
};

export interface IListDocument extends IList, Document, ListMethods {}

export type IListModel = PaginateModel<IListDocument>;
