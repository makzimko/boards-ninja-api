import { ObjectId, Document, Model } from 'mongoose';

interface ISession {
  user: ObjectId;
  sessionId: string;
}

export interface ISessionDocument extends ISession, Document {}

export type SessionStatics = {
  generate: {
    (this: ISessionModel, userId: ObjectId): Promise<ISessionDocument>;
  };
};

export interface ISessionModel
  extends Model<ISessionDocument>,
    SessionStatics {}
