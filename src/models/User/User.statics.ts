import md5 from 'md5';

import UserModel from './User.model';
import { IUserDocument } from './User.types';

const INCORRECT_LOGIN_OR_PASSWORD = 'Incorrect login or password';

export const authenticate = async (
  login: string,
  password: string,
): Promise<IUserDocument> => {
  const user = await UserModel.findOne({ login }).select(
    'encryptedPassword salt',
  );

  if (!user) {
    throw INCORRECT_LOGIN_OR_PASSWORD;
  }

  const encryptedPassword = md5(user.salt + password);

  if (user.encryptedPassword !== encryptedPassword) {
    throw INCORRECT_LOGIN_OR_PASSWORD;
  }

  return user;
};
