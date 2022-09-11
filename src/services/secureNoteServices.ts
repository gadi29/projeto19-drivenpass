import { SecureNotes } from "@prisma/client";
import { TSecureNote } from '../types/secureNoteType';
import * as secureNoteRepository from '../repositories/secureNoteRepository.js';

export async function getSecureNoteByTitle(userId: number, title: string) {
  const secureNote: SecureNotes = await secureNoteRepository.findByTitle(userId, title);

  return secureNote;
}

export async function createSecureNote(note: TSecureNote, userId: number) {
  const existTitleNote = await getSecureNoteByTitle(userId, note.title);
  if (existTitleNote) throw { type: 'conflict', message: 'You already have a secure note with this title' }

  await secureNoteRepository.createSecureNote({ ...note, userId });
  return;
}