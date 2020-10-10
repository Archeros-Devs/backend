import './bootstrap';
import "reflect-metadata"
import "express-async-errors";

import express, { Request, Response } from 'express';
import cors from 'cors';
import Youch from 'youch'
import Database from './database';
import routes from './routes';
import middlewares from './config/middlewares';
import AppError from './errors/AppError';

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
    this.server.use(async (err: Error | AppError, req, res, next) => {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
      }

      const errors = await new Youch(err, req).toHTML();
      const { NODE_ENV } = process.env
      if (NODE_ENV === 'develop' || NODE_ENV === 'test') {
        res.writeHead(200, { 'content-type': 'text/html' }).write(errors)
        return res.end()
      }
      return res.status(500).json({ error: 'Erro interno do servidor', errors });
    });
  }
}

export default new App().server;
