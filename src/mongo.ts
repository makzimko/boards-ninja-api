import { connect } from 'mongoose';

export const createConnection = async url => {
  await connect(url, {
    useNewUrlParser: true,
  });
};
