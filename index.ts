import { createServer } from 'http';

const port = 8080;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      hello: 'world',
    }),
  );
});

server.listen(port);
