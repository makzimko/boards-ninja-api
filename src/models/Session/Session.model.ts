import SessionSchema from './Session.schema';
import { model } from 'mongoose';
import { ISessionDocument } from './Sessions.types';

const SessionModel = model<ISessionDocument>('Session', SessionSchema);

export default SessionModel;
