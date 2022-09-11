import { WifiRegisters, Users } from "@prisma/client";
import { TWifiRegisterData } from "../types/wifiRegisterType.js";
import * as wifiRegisterRepository from '../repositories/wifiRegisterRepository.js';
import { cryptr } from "../config/cryptrKey.js";

export async function getWifiRegisterByTitle(userId: number, title: string) {
  const wifiRegister: WifiRegisters = await wifiRegisterRepository.findByTitle(userId, title);

  return wifiRegister;
}

export async function getWifiRegisterById(wifiRegisterId: number) {
  const wifiRegister: WifiRegisters = await wifiRegisterRepository.findById(wifiRegisterId);

  if (!wifiRegister) throw { type: 'not_found', message: 'Wifi register not found' }

  return wifiRegister;
}

export function isUserWifiRegister(userId: number, wifiRegister: WifiRegisters) {
  if (wifiRegister.userId !== userId) throw { type: 'unauthorized', message: 'Unauthorized' };
  return;
}

export function decryptPassword(password: string) {
  password = cryptr.decrypt(password);

  return password;
}

export async function createWifiRegister(wifiRegister: TWifiRegisterData, user: Users) {
  const existTitleWifiRegister = await getWifiRegisterByTitle(user.id, wifiRegister.title);
  if (existTitleWifiRegister) throw { type: 'conflict', message: 'You already have a Wifi register with this title' }

  const passwordHash: string = cryptr.encrypt(wifiRegister.password);

  await wifiRegisterRepository.createWifiRegister({ ...wifiRegister, password: passwordHash, userId: user.id });
  return;
}

export async function getUserWifiRegisters(userId: number) {
  const wifiRegisters = await wifiRegisterRepository.getAllUserWifiRegisters(userId);

  wifiRegisters.map(wifiRegister => wifiRegister.password = cryptr.decrypt(wifiRegister.password));

  return wifiRegisters;
}

export async function getWifiRegister(userId: number, wifiRegisterId: number) {
  const wifiRegister = await getWifiRegisterById(wifiRegisterId);
  isUserWifiRegister(userId, wifiRegister);
  const passwordDecrypted = decryptPassword(wifiRegister.password);

  return { ...wifiRegister, password: passwordDecrypted };
}

export async function deleteWifiRegister(userId: number, wifiRegisterId: number) {
  const wifiRegister: WifiRegisters = await getWifiRegisterById(wifiRegisterId);
  isUserWifiRegister(userId, wifiRegister);

  await wifiRegisterRepository.deleteWifiRegister(wifiRegisterId);
  return;
}