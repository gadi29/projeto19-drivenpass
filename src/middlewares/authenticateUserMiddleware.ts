import { NextFunction, Request, Response } from 'express';
import { number } from 'joi';
import jwt from 'jsonwebtoken';
import { getUserById } from '../services/userServices.js';

interface IDataJwt {
  id: number;
  iat: number;
  exp: number;
}

function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) throw { type: 'unauthorized', message: 'Unauthorized' }

  const token = authorization?.replace('Bearer ', '');

  jwt.verify(token, process.env.JWT_SECRET, async (error, data: IDataJwt) => {

    if (error) throw { type: 'unauthorized', message: 'Unauthorized' }

    const user = await getUserById(data.id);
    if (!user) throw { type: 'not_found', message: 'User not found' }

    res.locals.user = user;

    next();
  });
}

export default authenticateUser;