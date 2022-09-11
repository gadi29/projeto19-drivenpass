import { Cards, Users } from "@prisma/client";
import { TCardData } from "../types/cardType.js";
import * as cardRepository from '../repositories/cardRepository.js';
import { cryptr } from "../config/cryptrKey.js";

export async function getCardByTitle(userId: number, title: string) {
  const card: Cards = await cardRepository.findByTitle(userId, title);

  return card;
}

export async function getCardById(cardId: number) {
  const card: Cards = await cardRepository.findById(cardId);

  if (!card) throw { type: 'not_found', message: 'Card not found' }

  return card;
}

export function isUserCard(userId: number, card: Cards) {
  if (card.userId !== userId) throw { type: 'unauthorized', message: 'Unauthorized' };
  return;
}

export function decryptString(string: string) {
  const stringDecrypted: string = cryptr.decrypt(string);

  return stringDecrypted;
}

export async function createCard(card: TCardData, user: Users) {
  const existTitleCard = await getCardByTitle(user.id, card.title);
  if (existTitleCard) throw { type: 'conflict', message: 'You already have a card with this title' }

  const passwordHash: string = cryptr.encrypt(card.password);
  const securityNumberHash: string = cryptr.encrypt(card.securityNumber);

  await cardRepository.createCard({ ...card, securityNumber: securityNumberHash, password: passwordHash, userId: user.id });
  return;
}

export async function getUserCards(userId: number) {
  const cards = await cardRepository.getAllUserCards(userId);

  cards.map(card => {
    card.password = cryptr.decrypt(card.password);
    card.securityNumber = cryptr.decrypt(card.securityNumber);
  });

  return cards;
}

export async function getCard(userId: number, cardId: number) {
  const card = await getCardById(cardId);
  isUserCard(userId, card);
  const passwordDecrypted = decryptString(card.password);
  const securityNumberDecrypted = decryptString(card.securityNumber);

  return { ...card, securityNumber: securityNumberDecrypted, password: passwordDecrypted };
}

export async function deleteCard(userId: number, cardId: number) {
  const card: Cards = await getCardById(cardId);
  isUserCard(userId, card);

  await cardRepository.deleteCard(cardId);
  return;
}