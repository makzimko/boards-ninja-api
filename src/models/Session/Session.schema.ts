import { Schema, Types } from 'mongoose';

import { ISessionDocument } from './Sessions.types';
import sessionStatics from './Session.statics';

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

SessionSchema.static(sessionStatics);

export default SessionSchema;
