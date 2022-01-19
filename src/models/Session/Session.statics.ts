import randomString from 'randomstring';

import { SessionStatics } from './Sessions.types';
import SessionModel from './index';

const sessionStatics: SessionStatics = {
  generate: async function (userId) {
    const session = new SessionModel({
      user: userId,
      sessionId: randomString.generate(),
    });

    await session.save();

    return session;
  },
};

export default sessionStatics;
