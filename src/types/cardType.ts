import { Cards } from "@prisma/client";

export type TCardData = Omit<Cards, 'id' | 'userId?' | 'createdAt'>;