import { Schema, Types } from 'mongoose';

import { IUnitDocument } from './Unit.types';

const UnitSchema = new Schema<IUnitDocument>({
  name: {
    type: String,
    required: true,
  },
  project: {
    type: Types.ObjectId,
    ref: 'Project',
    required: true,
  },
});

export default UnitSchema;
