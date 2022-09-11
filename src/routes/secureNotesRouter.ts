import { Router } from "express";
import { createSecureNote } from "../controllers/secureNotesControllers.js";
import { authenticateUser } from "../middlewares/authenticateUserMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import secureNoteSchema from "../schemas/secureNoteSchema.js";

const secureNotesRouter = Router();

secureNotesRouter.post('/securenote', authenticateUser, validateSchemaMiddleware(secureNoteSchema), createSecureNote);
secureNotesRouter.get('/securenotes', authenticateUser);
secureNotesRouter.get('/securenote/:id', authenticateUser);
secureNotesRouter.delete('/securenote/:id', authenticateUser);

export default secureNotesRouter;