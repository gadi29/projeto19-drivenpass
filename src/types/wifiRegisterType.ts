import { WifiRegisters } from "@prisma/client";

export type TWifiRegisterData = Omit<WifiRegisters, 'id' | 'userId?' | 'createdAt'>;