import { Router } from "express";
import { signIn, signUp } from "../controllers/userControllers.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import newUserSchema from "../schemas/newUserSchema.js";

const userRouter = Router();

userRouter.post('/signup', validateSchemaMiddleware(newUserSchema), signUp);
userRouter.post('/signin', signIn);

export default userRouter;