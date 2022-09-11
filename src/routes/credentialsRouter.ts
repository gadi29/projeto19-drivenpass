import { Router } from "express";
import { createCredential } from "../controllers/credentialsControllers.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import credentialSchema from "../schemas/credentialSchema.js";

const credentialsRouter = Router();

credentialsRouter.post('/credential', validateSchemaMiddleware(credentialSchema), createCredential);

export default credentialsRouter;