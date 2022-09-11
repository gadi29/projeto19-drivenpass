import { Router } from "express";
import { createCredential, getCredential, getUserCredentials } from "../controllers/credentialsControllers.js";
import { authenticateUser } from "../middlewares/authenticateUserMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import credentialSchema from "../schemas/credentialSchema.js";

const credentialsRouter = Router();

credentialsRouter.post('/credential', authenticateUser, validateSchemaMiddleware(credentialSchema), createCredential);
credentialsRouter.get('/credential', authenticateUser, getUserCredentials);
credentialsRouter.get('/credential/:id', authenticateUser, getCredential);

export default credentialsRouter;