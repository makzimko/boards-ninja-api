import { Schema, model } from 'mongoose';

const schema = new Schema({
  login: {
    type: String,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
});

const SessionModel = model('Session', schema);

export default SessionModel;
