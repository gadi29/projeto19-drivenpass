import { Cards } from "@prisma/client";
import { TCardData } from "../types/cardType.js";
import prisma from "../config/database.js";

export async function findByTitle(userId: number, title: string) {
  const userId_title = { userId, title };

  const card: Cards = await prisma.cards.findUnique({
    where: {
      userId_title
    }
  });

  return card;
}

export async function findById(id: number) {
  const card: Cards = await prisma.cards.findUnique({ where: { id } });

  return card;
}

export async function createCard(cardData: TCardData) {
  await prisma.cards.create({ data: cardData });
}

export async function getAllUserCards(userId: number) {
  const cards = await prisma.cards.findMany({ where: { userId } });

  return cards;
}

export async function deleteCard(id: number) {
  await prisma.cards.delete({ where: { id } });
}