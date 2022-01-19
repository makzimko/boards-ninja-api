import { Document, Model } from 'mongoose';

interface IUser {
  login: string;
  name: string;
  encryptedPassword: string;
  salt: string;
}
export type UserMethods = {
  checkPassword: {
    (this: IUserDocument, password: string): boolean;
  };
};

export interface IUserDocument extends IUser, Document, UserMethods {}

export type UserStatics = {
  authenticate: {
    (this: IUserModel, login: string, password: string): Promise<IUserDocument>;
  };
};

export interface IUserModel extends Model<IUserDocument>, UserStatics {}
