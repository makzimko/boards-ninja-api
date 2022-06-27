import UnitModel from '../Unit';
import { ListModel } from '../index';

import { ListMethods } from './List.types';
import { IUnitDocument } from '../Unit/Unit.types';

const listMethods: ListMethods = {
  edit: async function (props) {
    const { project, units, predefined, archived, ...rest } = props;

    this.set(rest);
    await this.save();
  },
  archive: async function (destinationList?) {
    if (this.archived) {
      throw new Error('List is already archived');
    }

    const units = (await ListModel.populate(this, 'units'))
      .units as unknown as IUnitDocument[];

    if (!units.length) {
      throw new Error("Empty list can't be archived");
    }

    const notCompletedUnits = units.filter(({ completed }) => !completed);
    const list = await ListModel.findById(destinationList);

    if (notCompletedUnits.length && !list) {
      if (destinationList) {
        throw new Error('Destination list not found');
      } else {
        throw new Error('Destination list should be set');
      }
    }

    if (notCompletedUnits.length && list.archived) {
      throw new Error('Destination list is already archived');
    }

    await UnitModel.moveUnits(notCompletedUnits, list);

    const completedUnits = units.filter(({ completed }) => completed);
    await Promise.all(completedUnits.map(unit => unit.archive()));

    this.set('archived', true);
    await this.save();

    return {
      archived: completedUnits.map(({ _id }) => _id),
      moved: notCompletedUnits.map(({ _id }) => _id),
    };
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
