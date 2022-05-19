import { Types } from 'mongoose';

import { UnitStatics } from './Unit.types';
import { UnitModel } from '../index';
import ListModel from '../List';

const unitStatics: UnitStatics = {
  findByIds: async function (ids) {
    const units = await UnitModel.find({
      _id: { $in: ids.map(id => Types.ObjectId(id)) },
    });

    return units;
  },
  moveUnits: async function (units, list) {
    const unitIds = units.map(({ _id }) => Types.ObjectId(_id));

    const updateSourceLists = ListModel.updateMany(
      {
        units: { $all: unitIds },
      },
      {
        $pull: {
          units: { $in: unitIds },
        },
      },
    );

    const updateUnits = UnitModel.updateMany(
      {
        _id: {
          $in: unitIds,
        },
      },
      {
        list: list._id,
      },
    );

    const updateDestinationList = list.update({
      $push: {
        units: { $each: unitIds },
      },
    });

    await Promise.all([updateSourceLists, updateUnits]);
    await updateDestinationList;
  },
};

export default unitStatics;
