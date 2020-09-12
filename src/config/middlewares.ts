// eslint-disable-next-line no-unused-vars
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const Middlewares = (app: express.Application) => {
  app.use(bodyParser.json());
  
  app.use('/', express.static(path.resolve('./apidoc')));
  app.use('/health', (req, res) => res.status(200).send('OK'));
};

export default Middlewares;
