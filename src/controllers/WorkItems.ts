import WorkItemModel from '../models/WorkItem';
import { WorkItem } from '../models/types';

const create = async (data: WorkItem) => {
  return WorkItemModel.create(data);
};

const find = () => {
  return WorkItemModel.find();
};

const findOneById = id => {
  return WorkItemModel.findById(id);
};

const WorkItemsController = {
  create,
  find,
  findOneById,
};

export default WorkItemsController;
