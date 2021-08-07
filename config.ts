const config = {
  development: {
    databaseUrl: 'mongodb://mongo:27017/boards-ninja',
  },
  production: {
    databaseUrl: process.env.DATABASE_URL,
    certificateFile: '/root/ca-certificate.cer',
  },
};

export default config[process.env.NODE_ENV] || config.development;
