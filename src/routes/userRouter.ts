import { Router } from "express";
import { signUp } from "../controllers/userControllers.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import newUserSchema from "../schemas/newUserSchema.js";

const userRouter = Router();

userRouter.post('/signup', validateSchemaMiddleware(newUserSchema), signUp);

export default userRouter;