import { Router } from "express";
import { createWifiRegister, deleteWifiRegister, getUserWifiRegisters, getWifiRegister } from "../controllers/wifiRegistersControllers.js";
import { authenticateUser } from "../middlewares/authenticateUserMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import wifiRegisterSchema from "../schemas/wifiRegisterSchema.js";

const wifiRegistersRouter = Router();

wifiRegistersRouter.post('/wifi', authenticateUser, validateSchemaMiddleware(wifiRegisterSchema), createWifiRegister);
wifiRegistersRouter.get('/wifi', authenticateUser, getUserWifiRegisters);
wifiRegistersRouter.get('/wifi/:id', authenticateUser, getWifiRegister);
wifiRegistersRouter.delete('/wifi/:id', authenticateUser, deleteWifiRegister);

export default wifiRegistersRouter;