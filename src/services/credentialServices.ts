import { Credentials } from "@prisma/client";
import { TCredentialData } from "../types/credentialType.js";
import * as credentialRepository from '../repositories/credentialRepository.js';
import { cryptr } from "../config/cryptrKey.js";
import { getUserById } from "./userServices.js";

export async function getCredentialByTitle(userId: number, title: string) {
  const credential: Credentials = await credentialRepository.findByTitle(userId, title);

  return credential;
}

export async function createCredential(credential: TCredentialData) {
  const user = await getUserById(credential.userId);
  if (!user) throw { type: 'bad_request', message: 'User id not found' }

  const existTitleCredential = await getCredentialByTitle(credential.userId, credential.title);
  if (existTitleCredential) throw { type: 'conflict', message: 'You already have a credential with this title' }

  const passwordHash: string = cryptr.encrypt(credential.password);

  await credentialRepository.createCredential({ ...credential, password: passwordHash });
  return;
}