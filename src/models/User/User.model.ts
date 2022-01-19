import { model } from 'mongoose';
import { IUserDocument, IUserModel } from './User.types';
import UserSchema from './User.schema';

const UserModel = model<IUserDocument, IUserModel>('User', UserSchema);

export default UserModel;
