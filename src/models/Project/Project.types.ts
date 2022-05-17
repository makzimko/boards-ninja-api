import { Document, Model } from 'mongoose';
import { IUnitDocument } from '../Unit/Unit.types';
import { IListDocument } from '../List/List.types';

export interface IProject {
  name: string;
  key: string;
}

export type ProjectMethods = {
  createSimpleUnit: {
    (this: IProjectDocument, name: string): Promise<IUnitDocument>;
  };
  createList: {
    (
      this: IProjectDocument,
      name: string,
      predefined: boolean,
    ): Promise<IListDocument>;
  };
};

export interface IProjectDocument extends IProject, Document, ProjectMethods {}

export type ProjectStatics = {
  getByKey: {
    (this: IProjectModel, key: string): Promise<IProjectDocument>;
  };
};

export interface IProjectModel
  extends Model<IProjectDocument>,
    ProjectStatics {}
