import { SecureNotes } from "@prisma/client";

export type TSecureNote = Omit<SecureNotes, 'id' | 'userId?' | 'createdAt'>;