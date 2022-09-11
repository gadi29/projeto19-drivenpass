import Joi from "joi";
import { TWifiRegisterData } from "../types/wifiRegisterType";

const wifiRegisterSchema = Joi.object<TWifiRegisterData>({
  title: Joi.string().required(),
  networkName: Joi.string().required(),
  password: Joi.string().required()
})

export default wifiRegisterSchema;