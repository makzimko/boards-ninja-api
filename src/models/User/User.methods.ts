import md5 from 'md5';

import { UserMethods } from './User.types';

const userMethods: UserMethods = {
  checkPassword: function (password) {
    const encryptedPassword = md5(this.salt + password);

    return this.encryptedPassword === encryptedPassword;
  },
};

export default userMethods;
