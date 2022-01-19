import { Schema } from 'mongoose';

import { IUserDocument } from './User.types';
import { authenticate } from './User.statics';
import { validatePassword } from './User.methods';

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

UserSchema.statics.authenticate = authenticate;

UserSchema.methods.validatePassword = validatePassword;

export default UserSchema;
