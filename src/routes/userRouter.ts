import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import newUserSchema from "../schemas/newUserSchema";

const userRouter = Router();

userRouter.post('/signup', validateSchemaMiddleware(newUserSchema));

export default userRouter;