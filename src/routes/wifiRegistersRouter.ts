import { Router } from "express";
import { authenticateUser } from "../middlewares/authenticateUserMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import wifiRegisterSchema from "../schemas/wifiRegisterSchema.js";

const wifiRegistersRouter = Router();

wifiRegistersRouter.post('/wifi', authenticateUser, validateSchemaMiddleware(wifiRegisterSchema), createWifiRegister);
wifiRegistersRouter.get('/wifis', authenticateUser, getWifiRegisters);
wifiRegistersRouter.get('/wifi/:id', authenticateUser, getWifiRegister);
wifiRegistersRouter.delete('/wifi/:id', authenticateUser, deleteWifiRegister);

export default wifiRegistersRouter;