import { SecureNotes } from "@prisma/client";
import { TSecureNote } from '../types/secureNoteType';
import prisma from "../config/database.js";

export async function findByTitle(userId: number, title: string) {
  const userId_title = { userId, title };

  const secureNote: SecureNotes = await prisma.secureNotes.findUnique({
    where: {
      userId_title
    }
  });

  return secureNote;
}

// export async function findById(id: number) {
//   const secureNote: SecureNotes = await prisma.secureNotes.findUnique({ where: { id } });

//   return secureNote;
// }

export async function createSecureNote(secureNoteData: TSecureNote) {
  await prisma.secureNotes.create({ data: secureNoteData });
}

export async function getAllUserSecureNotes(userId: number) {
  const secureNotes = await prisma.secureNotes.findMany({ where: { userId } });

  return secureNotes;
}

// export async function deleteSecureNote(id: number) {
//   await prisma.secureNotes.delete({ where: { id } });
// }