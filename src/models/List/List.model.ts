import { model } from 'mongoose';

import { IListDocument, IListModel } from './List.types';
import ListSchema from './List.schema';

const ListModel = model<IListDocument, IListModel>('List', ListSchema);

export default ListModel;
