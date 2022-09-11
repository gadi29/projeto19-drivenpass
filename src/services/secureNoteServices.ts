import { SecureNotes } from "@prisma/client";
import { TSecureNote } from '../types/secureNoteType';
import * as secureNoteRepository from '../repositories/secureNoteRepository.js';

export async function getSecureNoteByTitle(userId: number, title: string) {
  const secureNote: SecureNotes = await secureNoteRepository.findByTitle(userId, title);

  return secureNote;
}

export async function getSecureNoteById(secureNoteId: number) {
  const secureNote: SecureNotes = await secureNoteRepository.findById(secureNoteId);

  if (!secureNote) throw { type: 'not_found', message: 'Secure note not found' }

  return secureNote;
}

export function isUserSecureNote(userId: number, secureNote: SecureNotes) {
  if (secureNote.userId !== userId) throw { type: 'unauthorized', message: 'Unauthorized' };
  return;
}

export async function createSecureNote(note: TSecureNote, userId: number) {
  const existTitleNote = await getSecureNoteByTitle(userId, note.title);
  if (existTitleNote) throw { type: 'conflict', message: 'You already have a secure note with this title' }

  await secureNoteRepository.createSecureNote({ ...note, userId });
  return;
}

export async function getUserSecureNotes(userId: number) {
  const secureNotes = await secureNoteRepository.getAllUserSecureNotes(userId);

  return secureNotes;
}

export async function getSecureNote(userId: number, secureNoteId: number) {
  const secureNote = await getSecureNoteById(secureNoteId);
  isUserSecureNote(userId, secureNote);

  return secureNote;
}

export async function deleteSecureNote(userId: number, secureNoteId: number) {
  const secureNote: SecureNotes = await getSecureNoteById(secureNoteId);
  isUserSecureNote(userId, secureNote);

  await secureNoteRepository.deleteSecureNote(secureNoteId);
  return;
}