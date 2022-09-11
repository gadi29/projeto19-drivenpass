import { Router } from 'express';
import credentialsRouter from './credentialsRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use(userRouter);
router.use(credentialsRouter);

export default router;