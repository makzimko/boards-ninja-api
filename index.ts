import App from './src/app';
import { createConnection } from './src/mongo';
import config from './config';

const port = 8080;

createConnection(config.databaseUrl, config.certificateFile).then(() => {
  App.listen(port, () => {
    console.log(`Application started on ${port}`);
  });
});
