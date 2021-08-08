import { Schema, model, connection } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import mongooseLeanDefaults from 'mongoose-lean-defaults';

autoIncrement.initialize(connection);

const schema = new Schema({
  id: Number,
  name: String,
  resolved: {
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

const WorkItemModel = model('WorkItem', schema);

export default WorkItemModel;
