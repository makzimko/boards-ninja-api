import { Schema } from 'mongoose';

import { IUserDocument } from './User.types';
import userStatics from './User.statics';
import userMethods from './User.methods';

const UserSchema = new Schema<IUserDocument>({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  encryptedPassword: String,
  salt: String,
});

UserSchema.static(userStatics);
UserSchema.method(userMethods);

export default UserSchema;
