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

export async function getUserSecureNotes(req: Request, res: Response) {
  const user: Users = res.locals.user;

  const secureNotes = await secureNoteServices.getUserSecureNotes(user.id);
  res.status(200).send(secureNotes);
}

export async function getSecureNote(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const secureNoteId: number = +req.params.id;

  const secureNote = await secureNoteServices.getSecureNote(user.id, secureNoteId);
  res.status(200).send(secureNote);
}

// export async function deleteSecureNote(req: Request, res: Response) {
//   const user: Users = res.locals.user;
//   const secureNoteId: number = +req.params.id;

//   await secureNoteServices.deleteSecureNote(user.id, secureNoteId);
//   res.status(200).send('Secure note deleted successfully');
// }