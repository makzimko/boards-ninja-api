import { model } from 'mongoose';

import SessionSchema from './Session.schema';
import { ISessionDocument, ISessionModel } from './Sessions.types';

const SessionModel = model<ISessionDocument, ISessionModel>(
  'Session',
  SessionSchema,
);

export default SessionModel;
