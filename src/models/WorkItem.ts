import { Schema, model, connection } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import mongoosePaginate from 'mongoose-paginate-v2';

autoIncrement.initialize(connection);

export type WorkItem = {
  id: number;
  name: string;
  resolved: boolean;
  archived: boolean;
};

const schema = new Schema({
  id: Number,
  name: String,
  resolved: {
    type: Boolean,
    default: false,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

schema.plugin(autoIncrement.plugin, {
  model: 'WorkItem',
  field: 'id',
  startAt: 1,
});
schema.plugin(mongooseLeanDefaults);
schema.plugin(mongoosePaginate);

const WorkItemModel = model<WorkItem>('WorkItem', schema);

export default WorkItemModel;
