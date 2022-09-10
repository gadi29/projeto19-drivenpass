import { Request, Response } from 'express';
import { TUserData } from '../types/userTypes.js';
import * as userService from '../services/userServices.js';

export async function signUp(req: Request, res: Response) {
  const newUser: TUserData = req.body;

  await userService.signUp(newUser);
  res.status(201).send('User registered successfully');
}