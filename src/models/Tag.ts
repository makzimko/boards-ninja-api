import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const TagModel = model('Tag', schema);

export default TagModel;
