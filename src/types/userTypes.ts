import { Users } from "@prisma/client";

export type TUserData = Omit<Users, 'id' | 'createdAt'>;