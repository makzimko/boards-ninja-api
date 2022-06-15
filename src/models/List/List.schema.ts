import { Schema, Types } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import { IListDocument } from './List.types';
import listMethods from './List.methods';

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
ListSchema.method(listMethods);

export default ListSchema;
