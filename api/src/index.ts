import express from 'express';
import * as http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import 'reflect-metadata';
import sqlite3 from 'sqlite3';
import { StreamersRoutes } from './streamers/streamers.routes';
import DbService from './common/db.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());

const db = new sqlite3.Database('test.db');

if (process.env.NODE_ENV !== 'test') {
  DbService.connect();
}

new StreamersRoutes(app);

export default server.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
