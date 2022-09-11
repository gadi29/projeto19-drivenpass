import { Request, Response } from 'express';
import { TCredentialData } from '../types/credentialType';
import * as credentialServices from '../services/credentialServices.js';

export async function createCredential(req: Request, res: Response) {
  const newCredential: TCredentialData = req.body;

  await credentialServices.createCredential(newCredential);
  res.status(201).send('Credential registered successfully');
}