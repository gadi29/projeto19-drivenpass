import { Credentials, Users } from "@prisma/client";
import { TCredentialData } from "../types/credentialType.js";
import * as credentialRepository from '../repositories/credentialRepository.js';
import { cryptr } from "../config/cryptrKey.js";

export async function getCredentialByTitle(userId: number, title: string) {
  const credential: Credentials = await credentialRepository.findByTitle(userId, title);

  return credential;
}

export async function getCredentialById(userId: number, credentialId: number) {
  const credential: Credentials = await credentialRepository.findById(credentialId);

  if (!credential) throw { type: 'not_found', message: 'Credential not found' }
  if (userId !== credential.userId) throw { type: 'unauthorized', message: 'You are not authorized to access this credential' }

  credential.password = cryptr.decrypt(credential.password);

  return credential;
}

export async function createCredential(credential: TCredentialData, user: Users) {
  const existTitleCredential = await getCredentialByTitle(user.id, credential.title);
  if (existTitleCredential) throw { type: 'conflict', message: 'You already have a credential with this title' }

  const passwordHash: string = cryptr.encrypt(credential.password);

  await credentialRepository.createCredential({ ...credential, password: passwordHash, userId: user.id });
  return;
}

export async function getUserCredentials(userId: number) {
  const credentials = await credentialRepository.getAllUserCredentials(userId);

  credentials.map(credential => credential.password = cryptr.decrypt(credential.password));

  return credentials;
}