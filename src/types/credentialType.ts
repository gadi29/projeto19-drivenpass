import { Credentials } from "@prisma/client";

export type TCredentialData = Omit<Credentials, 'id' | 'userId?' | 'createdAt'>;