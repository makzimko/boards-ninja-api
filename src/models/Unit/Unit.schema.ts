import { Schema, Types } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import mongoosePaginate from 'mongoose-paginate-v2';

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

UnitSchema.plugin(mongooseLeanDefaults);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
UnitSchema.plugin(mongoosePaginate);

export default UnitSchema;
