import { Document, Model } from 'mongoose';
import { IUserDocument } from '../User/User.types';

export interface IProject {
  name: string;
  key: string;
}

export interface IProjectDocument extends IProject, Document {}

export type IProjectModel = Model<IUserDocument>;
