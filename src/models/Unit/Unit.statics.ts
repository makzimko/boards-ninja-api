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
};

export default unitStatics;
