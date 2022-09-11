import { Request, Response } from 'express';
import { Users } from '@prisma/client';
import { TCredentialData } from '../types/credentialType.js';
import * as credentialServices from '../services/credentialServices.js';

export async function createCredential(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const newCredential: TCredentialData = req.body;

  await credentialServices.createCredential(newCredential, user);
  res.status(201).send('Credential registered successfully');
}

export async function getUserCredentials(req: Request, res: Response) {
  const user: Users = res.locals.user;

  const credentials = await credentialServices.getUserCredentials(user.id);
  res.status(200).send(credentials);
}