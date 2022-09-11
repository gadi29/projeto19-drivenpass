import { Users } from "@prisma/client";
import { TUserData } from "../types/userTypes.js";
import prisma from "../config/database.js";

export async function findByEmail(email: string) {
  const user: Users = await prisma.users.findUnique({ where: { email } });

  return user;
}

export async function findById(userId: number) {
  const user: Users = await prisma.users.findUnique({ where: { id: userId } });

  return user;
}

export async function createUser(newUser: TUserData) {
  await prisma.users.create({ data: newUser });
}