import Joi from "joi";
import { join } from "path";

const newUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required()
})

export default newUserSchema;