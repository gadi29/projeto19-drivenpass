import { Router } from 'express';
import cardsRouter from './cardsRouter.js';

import credentialsRouter from './credentialsRouter.js';
import secureNotesRouter from './secureNotesRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use(userRouter);
router.use(credentialsRouter);
router.use(secureNotesRouter);
router.use(cardsRouter);

export default router;