import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: 'string',
});

const WorkItemModel = model('WorkItem', schema);

export default WorkItemModel;
