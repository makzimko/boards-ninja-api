import { Document, Model } from 'mongoose';

interface IUser {
  login: string;
  name: string;
  encryptedPassword: string;
  salt: string;
}

export interface IUserDocument extends IUser, Document {
  validatePassword(): boolean;
}

export interface IUserModel extends Model<IUserDocument> {
  authenticate(login: string, password: string): IUserDocument;
}
