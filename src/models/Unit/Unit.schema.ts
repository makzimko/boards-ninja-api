import { Schema, Types } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import mongoosePaginate from 'mongoose-paginate-v2';

import { IUnitDocument } from './Unit.types';
import unitStatics from './Unit.statics';
import unitMethods from './Unit.methods';

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
  completed: {
    type: Boolean,
    default: false,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  list: {
    type: Types.ObjectId,
    ref: 'List',
    required: true,
  },
  data: {
    type: Schema.Types.Mixed,
    default: {},
  },
});

UnitSchema.static(unitStatics);
UnitSchema.method(unitMethods);
UnitSchema.plugin(mongooseLeanDefaults);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
UnitSchema.plugin(mongoosePaginate);

export default UnitSchema;
