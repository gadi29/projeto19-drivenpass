import Joi from "joi";
import { TCredentialData } from "../types/credentialType";

const credentialSchema = Joi.object<TCredentialData>({
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
  userName: Joi.string().required(),
  password: Joi.string().required()
})

export default credentialSchema;