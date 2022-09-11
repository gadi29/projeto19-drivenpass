import { Users } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getUserById } from '../services/userServices.js';

interface IDataJwt {
  id: number;
  iat: number;
  exp: number;
}

async function verifyJWTFunction(error, data: IDataJwt) {
  if (error) throw { type: 'unauthorized', message: 'Unauthorized' }

  const user: Users = await getUserById(data.id);
  if (!user) throw { type: 'not_found', message: 'User not found' }

  return user;
}

export async function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) throw { type: 'unauthorized', message: 'Unauthorized' }

  const token = authorization?.replace('Bearer ', '');

  const user = await jwt.verify(token, process.env.JWT_SECRET, verifyJWTFunction);

  res.locals.user = user;

  next();
}