import { ProjectMethods } from './Project.types';
import { UnitModel } from '../index';

const projectMethods: ProjectMethods = {
  createSimpleUnit: async function (name) {
    const unit = new UnitModel({
      name,
      project: this._id,
    });

    await unit.save();

    return UnitModel.findById(unit._id);
  },
};

export default projectMethods;
