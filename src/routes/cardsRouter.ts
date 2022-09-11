import { Router } from "express";
import { createCard, getUserCards } from "../controllers/cardsControllers.js";
import { authenticateUser } from "../middlewares/authenticateUserMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";

const cardsRouter = Router();

cardsRouter.post('/card', authenticateUser, validateSchemaMiddleware(cardSchema), createCard);
cardsRouter.get('/cards', authenticateUser, getUserCards);
cardsRouter.get('/card/:id', authenticateUser, /*getCard*/);
cardsRouter.delete('/card/:id', authenticateUser, /*deleteCard*/);

export default cardsRouter;