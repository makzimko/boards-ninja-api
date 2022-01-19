import { ObjectId, Document, Model } from 'mongoose';

interface ISession {
  user: ObjectId;
  sessionId: string;
}

export interface ISessionDocument extends ISession, Document {}

export type ISessionModel = Model<ISessionDocument>;
