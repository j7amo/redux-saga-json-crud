const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: './build',
});
const cors = require('cors');

const port = process.env.PORT || 3333;

server.use(middlewares);
server.use(router);
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  }),
);
server.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);
server.options('*', cors());
server.listen(port, () => {
  console.log('JSON Server is running on port 3333');
});
