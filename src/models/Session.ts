import { Schema, model, Types } from 'mongoose';

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

const SessionModel = model('Session', schema);

export default SessionModel;
