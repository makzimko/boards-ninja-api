import { Schema, Types } from 'mongoose';
import { ISessionDocument } from './Sessions.types';

const SessionSchema = new Schema<ISessionDocument>({
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
  sessionId: {
    type: String,
    required: true,
  },
});

export default SessionSchema;
