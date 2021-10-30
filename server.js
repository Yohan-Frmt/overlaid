import express, { json, urlencoded, Router } from 'express';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import { Server } from 'http';
import { fileURLToPath } from 'url';
import Socket from './socket.js';
import sassMiddleware from 'node-sass-middleware';
import database from './database/index.js';
import config from './config/index.js';

database.mongoose
  .connect(
    'mongodb://localhost:27017/overlaid-db?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
  )
  .then(() => {
    database.initMap();
    console.log('Connected to Mongo Database');
  })
  .catch((e) => {
    console.error(`Error while connecting to Mongo Database : ${e}`);
    throw e;
  });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const server = new Server(app);
Socket(server);
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true,
  }),
);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(config.API_PORT, () => {
  console.info(`Api listening on port ${config.API_PORT}!`);
});

server.listen(Number(config.SOCKET_PORT), () => {
  console.info(`Overlaid listening on port ${Number(config.SOCKET_PORT)}!`);
  console.info(`Api and Overlaid whitelisted for ${config.ALLOW_LIST_HOSTS}`);
});
