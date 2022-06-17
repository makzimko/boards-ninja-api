import UnitModel from '../Unit';
import { ListModel } from '../index';

import { ListMethods } from './List.types';
import { IUnitDocument } from '../Unit/Unit.types';

const listMethods: ListMethods = {
  edit: async function (props) {
    const { project, units, predefined, ...rest } = props;

    this.set(rest);
    await this.save();
  },
  removeList: async function (destinationList) {
    if (!destinationList) {
      throw new Error('Destination list ID should be specified');
    }

    const units = (await ListModel.populate(this, 'units'))
      .units as unknown as IUnitDocument[];
    const list = await ListModel.findById(destinationList);

    if (!list) {
      throw new Error('Destination list not found');
    }

    await UnitModel.moveUnits(units as IUnitDocument[], list);
    await ListModel.findByIdAndRemove(this._id);

    return units.map(({ _id }) => _id);
  },
};

export default listMethods;
