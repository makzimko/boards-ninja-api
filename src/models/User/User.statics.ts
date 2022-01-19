import { UserStatics } from './User.types';

const INCORRECT_LOGIN_OR_PASSWORD = 'Incorrect login or password';

const userStatics: UserStatics = {
  authenticate: async function (login, password) {
    const user = await this.findOne({ login }).select('encryptedPassword salt');

    if (!user || !user.checkPassword(password)) {
      throw INCORRECT_LOGIN_OR_PASSWORD;
    }

    return user;
  },
};

export default userStatics;
