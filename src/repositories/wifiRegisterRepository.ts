import { WifiRegisters } from "@prisma/client";
import { TWifiRegisterData } from "../types/wifiRegisterType.js";
import prisma from "../config/database.js";

export async function findByTitle(userId: number, title: string) {
  const userId_title = { userId, title };

  const wifiRegister: WifiRegisters = await prisma.wifiRegisters.findUnique({
    where: {
      userId_title
    }
  });

  return wifiRegister;
}

export async function findById(id: number) {
  const wifiRegister: WifiRegisters = await prisma.wifiRegisters.findUnique({ where: { id } });

  return wifiRegister;
}

export async function createWifiRegister(wifiRegisterData: TWifiRegisterData) {
  await prisma.wifiRegisters.create({ data: wifiRegisterData });
}

export async function getAllUserWifiRegisters(userId: number) {
  const wifiRegisters = await prisma.wifiRegisters.findMany({ where: { userId } });

  return wifiRegisters;
}

export async function deleteWifiRegister(id: number) {
  await prisma.wifiRegisters.delete({ where: { id } });
}