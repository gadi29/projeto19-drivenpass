import { Request, Response } from 'express';
import { Users } from '@prisma/client';
import { TCardData } from '../types/cardType.js';
import * as cardServices from '../services/cardServices.js';

export async function createCard(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const newCard: TCardData = req.body;

  await cardServices.createCard(newCard, user);
  res.status(201).send('Card registered successfully');
}

export async function getUserCards(req: Request, res: Response) {
  const user: Users = res.locals.user;

  const cards = await cardServices.getUserCards(user.id);
  res.status(200).send(cards);
}

export async function getCard(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const cardId: number = +req.params.id;

  const card = await cardServices.getCard(user.id, cardId);
  res.status(200).send(card);
}

// export async function deleteCard(req: Request, res: Response) {
//   const user: Users = res.locals.user;
//   const cardId: number = +req.params.id;

//   await cardServices.deleteCard(user.id, cardId);
//   res.status(200).send('Card deleted successfully');
// }