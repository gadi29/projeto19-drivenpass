import { Credentials } from "@prisma/client";
import { TCredentialData } from "../types/credentialType.js";
import prisma from "../config/database.js";

export async function findByTitle(userId: number, title: string) {
  const userId_title = { userId, title };

  const credential: Credentials = await prisma.credentials.findUnique({
    where: {
      userId_title
    }
  });

  return credential;
}

export async function findById(id: number) {
  const credential: Credentials = await prisma.credentials.findUnique({ where: { id } });

  return credential;
}

export async function createCredential(credentialData: TCredentialData) {
  await prisma.credentials.create({ data: credentialData });
}

export async function getAllUserCredentials(userId: number) {
  const credentials = await prisma.credentials.findMany({ where: { userId } });

  return credentials;
}