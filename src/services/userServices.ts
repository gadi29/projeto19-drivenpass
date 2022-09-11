import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '@prisma/client';
import { TUserData } from '../types/userTypes.js';
import * as userRepository from '../repositories/userRepository.js'

export async function getUserByEmail(email: string) {
  const user: Users = await userRepository.findByEmail(email);

  return user;
}

export async function signUp(newUser: TUserData) {
  const existUser = await getUserByEmail(newUser.email);
  if (existUser) throw { type: 'conflict', message: 'This email already exists' }

  const SALT: number = 10;
  const passwordHash: string = bcrypt.hashSync(newUser.password, SALT);

  const userData: TUserData = { email: newUser.email, password: passwordHash }

  await userRepository.createUser(userData);

  return;
}

export async function signIn(userData: TUserData) {
  const user = await getUserByEmail(userData.email);
  if (!user) throw { type: 'unauthorized', message: 'Login error' }

  const confirmPassword: boolean = bcrypt.compareSync(userData.password, user.password);
  if (!confirmPassword) throw { type: 'unauthorized', message: 'Login error' }

  const token: string = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15 days' });

  return token;
}