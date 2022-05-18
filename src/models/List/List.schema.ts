import { Schema, Types } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import { IListDocument } from './List.types';

const ListSchema = new Schema<IListDocument>({
  name: {
    type: String,
    required: true,
  },
  project: {
    type: Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  units: [
    {
      type: Types.ObjectId,
      ref: 'Unit',
      required: true,
    },
  ],
  predefined: {
    type: Boolean,
    required: true,
  },
});

ListSchema.plugin(mongooseLeanDefaults);

export default ListSchema;