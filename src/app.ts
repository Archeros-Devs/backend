import './bootstrap';
import "reflect-metadata"
import "express-async-errors";

import express, { Request, Response, ErrorRequestHandler } from 'express';
import cors from 'cors';
import Youch from 'youch'
import Database from './database';
import routes from './routes';
import middlewares from './config/middlewares';

class App {
  server: express.Application;

  constructor() {
    this.server = express();

    this.database();
    this.cors();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  database() {
    Database.MySQL()
  }

  cors() {
    this.server.use(cors());
  }

  middlewares() {
    middlewares(this.server);
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req: Request, res: Response) => {
      const errors = await new Youch(err, req).toHTML();
      const { NODE_ENV } = process.env
      console.log(NODE_ENV)
      if (NODE_ENV === 'develop' || NODE_ENV === 'test') {
        return res.writeHead(200, { 'content-type': 'text/html' }).write(errors)
      }
      return res.status(500).json({ error: 'Erro interno do servidor', errors });
    });
  }
}

export default new App().server;
