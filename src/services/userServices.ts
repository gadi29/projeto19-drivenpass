import bcrypt from 'bcrypt';
import { Users } from '@prisma/client';
import { TUserData } from '../types/userTypes.js';
import * as userRepository from '../repositories/userRepository.js'

export async function getUserByEmail(email: string) {
  const user: Users = await userRepository.findByEmail(email);

  return user;
}

export async function signUp(newUser: TUserData) {
  const existUser = getUserByEmail(newUser.email);
  if (existUser) throw { type: 409, message: 'This email already exists' }

  const SALT: number = 10;
  const passwordHash: string = bcrypt.hashSync(newUser.password, SALT);

  const userData: TUserData = { email: newUser.email, password: passwordHash }

  await userRepository.createUser(userData);

  return;
}