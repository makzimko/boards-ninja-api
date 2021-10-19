import { Schema, model, Types, ObjectId } from 'mongoose';

export type Session = {
  user: ObjectId;
  sessionId: string;
};

const schema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
  sessionId: {
    type: String,
    required: true,
  },
});

const SessionModel = model<Session>('Session', schema);

export default SessionModel;
