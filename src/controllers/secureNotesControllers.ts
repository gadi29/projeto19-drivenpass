import { Request, Response } from 'express';
import { Users } from '@prisma/client';
import { TSecureNote } from '../types/secureNoteType';
import * as secureNoteServices from '../services/secureNoteServices.js';

export async function createSecureNote(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const newNote: TSecureNote = req.body;

  await secureNoteServices.createSecureNote(newNote, user.id);
  res.status(201).send('Secure note registered successfully');
}