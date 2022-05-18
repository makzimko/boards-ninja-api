import { Types, Schema } from 'mongoose';

import { UnitStatics } from './Unit.types';
import { UnitModel } from '../index';

const unitStatics: UnitStatics = {
  findByIds: async function (ids) {
    const units = await UnitModel.find({
      _id: { $in: ids.map(id => Types.ObjectId(id)) },
    });

    return units;
  },
  moveUnits: async function (units, { from, to }) {
    const unitIds = units.map(({ _id }) => Types.ObjectId(_id));

    const fromListUnits = from.units.map(id => id);

    const missingUnitInList = unitIds.filter(
      id => !Array.from(fromListUnits).find(unit => id.equals(unit.toString())),
    );

    if (missingUnitInList.length) {
      return Error(`Can't find units ${missingUnitInList} in list ${from._id}`);
    }

    await from.update(
      {
        $pull: {
          units: { $in: unitIds },
        },
      },
      { upsert: true },
    );

    await to.update({
      $push: {
        units: { $each: unitIds },
      },
    });
  },
};

export default unitStatics;
