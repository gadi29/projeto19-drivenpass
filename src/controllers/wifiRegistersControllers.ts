import { Request, Response } from 'express';
import { Users } from '@prisma/client';
import { TWifiRegisterData } from '../types/wifiRegisterType.js';
import * as wifiRegisterServices from '../services/wifiRegisterServices.js';

export async function createWifiRegister(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const newWifiRegister: TWifiRegisterData = req.body;

  await wifiRegisterServices.createWifiRegister(newWifiRegister, user);
  res.status(201).send('Wifi register registered successfully');
}

export async function getUserWifiRegisters(req: Request, res: Response) {
  const user: Users = res.locals.user;

  const wifiRegisters = await wifiRegisterServices.getUserWifiRegisters(user.id);
  res.status(200).send(wifiRegisters);
}

export async function getWifiRegister(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const wifiRegisterId: number = +req.params.id;

  const wifiRegister = await wifiRegisterServices.getWifiRegister(user.id, wifiRegisterId);
  res.status(200).send(wifiRegister);
}

export async function deleteWifiRegister(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const wifiRegisterId: number = +req.params.id;

  await wifiRegisterServices.deleteWifiRegister(user.id, wifiRegisterId);
  res.status(200).send('Wifi register deleted successfully');
}