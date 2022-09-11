import Joi from "joi";
import { TSecureNote } from "../types/secureNoteType";

const secureNoteSchema = Joi.object<TSecureNote>({
  title: Joi.string().max(50).required(),
  annotation: Joi.string().max(1000).required()
})

export default secureNoteSchema;