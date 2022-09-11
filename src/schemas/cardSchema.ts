import Joi from "joi";
import { TCardData } from "../types/cardType";

const cardSchema = Joi.object<TCardData>({
  title: Joi.string().required(),
  number: Joi.string().required(),
  cardholderName: Joi.string().required(),
  expirationDate: Joi.string().required(),
  securityNumber: Joi.string().required(),
  password: Joi.string().required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().valid('CREDIT', 'DEBIT', 'BOTH').required(),
})

export default cardSchema;