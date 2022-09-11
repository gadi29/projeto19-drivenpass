import { Credentials, Users } from "@prisma/client";
import { TCredentialData } from "../types/credentialType.js";
import * as credentialRepository from '../repositories/credentialRepository.js';
import { cryptr } from "../config/cryptrKey.js";

export async function getCredentialByTitle(userId: number, title: string) {
  const credential: Credentials = await credentialRepository.findByTitle(userId, title);

  return credential;
}

export async function getCredentialById(credentialId: number) {
  const credential: Credentials = await credentialRepository.findById(credentialId);

  if (!credential) throw { type: 'not_found', message: 'Credential not found' }

  return credential;
}

export function isUserCredential(userId: number, credential: Credentials) {
  if (credential.userId !== userId) throw { type: 'unauthorized', message: 'Unauthorized' };
  return;
}

export function decryptPassword(password: string) {
  password = cryptr.decrypt(password);

  return password;
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

export async function getCredential(userId: number, credentialId: number) {
  const credential = await getCredentialById(credentialId);
  isUserCredential(userId, credential);
  const passwordDecrypted = decryptPassword(credential.password);

  return { ...credential, password: passwordDecrypted };
}

export async function deleteCredential(userId: number, credentialId: number) {
  const credential: Credentials = await getCredentialById(credentialId);
  isUserCredential(userId, credential);

  await credentialRepository.deleteCredential(credentialId);
  return;
}