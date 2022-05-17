import { ProjectMethods } from './Project.types';
import { ListModel, UnitModel } from '../index';

const projectMethods: ProjectMethods = {
  createSimpleUnit: async function (name) {
    const unit = new UnitModel({
      name,
      project: this._id,
    });

    await unit.save();

    return UnitModel.findById(unit._id);
  },
  createList: async function (name, predefined = false) {
    const list = new ListModel({
      name,
      project: this._id,
      predefined,
    });

    await list.save();

    return ListModel.findById(list._id, '-units');
  },
};

export default projectMethods;
