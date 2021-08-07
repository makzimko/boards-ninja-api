import { connect } from 'mongoose';

export const createConnection = async (url, caFile) => {
  await connect(url, {
    useNewUrlParser: true,
    tlsCAFile: caFile,
  });
};
