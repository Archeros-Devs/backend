import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'] || '';
  const { ACCESS_TOKEN_SECRET } = process.env;

  if (!token) return res.status(401).send('Forbidden');

  return jwt.verify(token.toString(), ACCESS_TOKEN_SECRET, (error) => {
    if (error) return res.status(401).json({ error });
    return next();
  });
};
