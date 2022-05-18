import { Types, Schema } from 'mongoose';

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

    await ListModel.updateMany(
      {
        units: { $all: unitIds },
      },
      {
        $pull: {
          units: { $in: unitIds },
        },
      },
    );

    await list.update({
      $push: {
        units: { $each: unitIds },
      },
    });
  },
};

export default unitStatics;
