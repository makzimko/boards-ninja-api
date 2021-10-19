import { Schema, model } from 'mongoose';

export type User = {
  login: string;
  name: string;
  password: string;
  salt: string;
};

const schema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  password: String,
  salt: String,
});

const UserModel = model<User>('User', schema);

export default UserModel;
