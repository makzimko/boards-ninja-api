import { Schema, model, connection } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

autoIncrement.initialize(connection);

const schema = new Schema({
  id: 'number',
  name: 'string',
});

schema.plugin(autoIncrement.plugin, {
  model: 'WorkItem',
  field: 'id',
  startAt: 1,
});

const WorkItemModel = model('WorkItem', schema);

export default WorkItemModel;
