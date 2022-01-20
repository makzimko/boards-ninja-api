import { model } from 'mongoose';

import { IUnitDocument, IUnitModel } from './Unit.types';
import UnitSchema from './Unit.schema';

const UnitModel = model<IUnitDocument, IUnitModel>('Unit', UnitSchema);

export default UnitModel;
