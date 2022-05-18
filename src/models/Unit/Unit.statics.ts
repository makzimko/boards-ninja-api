import { UnitStatics } from './Unit.types';
import { UnitModel } from '../index';
import { Types } from 'mongoose';

const unitStatics: UnitStatics = {
  findByIds: async function (ids) {
    const units = await UnitModel.find({
      _id: { $in: ids.map(id => Types.ObjectId(id)) },
    });

    return units;
  },
  moveUnits: async function (units, { from, to }) {
    const unitIds = units.map(({ _id }) => Types.ObjectId(_id));

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
