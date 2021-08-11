import { Schema, model } from 'mongoose';

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

const UserModel = model('User', schema);

export default UserModel;
