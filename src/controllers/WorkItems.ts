import WorkItemModel from '../models/WorkItem';
import { WorkItem } from '../models/types';

const create = async (data: WorkItem): Promise<WorkItem> => {
  const result = await WorkItemModel.create(data);

  return WorkItemModel.findById(result._id).select('id name -_id');
};

const findById = (id: number) => {
  return WorkItemModel.find({ id });
};

const find = (): Array<WorkItem> => {
  return WorkItemModel.find().select('id name -_id');
};

const WorkItemsController = {
  create,
  find,
  findById,
};

export default WorkItemsController;
