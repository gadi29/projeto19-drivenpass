import { Router } from "express";
import { createCredential, deleteCredential, getCredential, getUserCredentials } from "../controllers/credentialsControllers.js";
import { authenticateUser } from "../middlewares/authenticateUserMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import credentialSchema from "../schemas/credentialSchema.js";

const credentialsRouter = Router();

credentialsRouter.post('/credential', authenticateUser, validateSchemaMiddleware(credentialSchema), createCredential);
credentialsRouter.get('/credentials', authenticateUser, getUserCredentials);
credentialsRouter.get('/credential/:id', authenticateUser, getCredential);
credentialsRouter.delete('/credential/:id', authenticateUser, deleteCredential);

export default credentialsRouter;