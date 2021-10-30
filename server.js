import express, { json, urlencoded, Router } from 'express';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import { Server } from 'http';
import { fileURLToPath } from 'url';
import Socket from './socket.js';
import sassMiddleware from 'node-sass-middleware';

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
