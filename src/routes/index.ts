import { Router } from 'express';

import credentialsRouter from './credentialsRouter.js';
import secureNotesRouter from './secureNotesRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use(userRouter);
router.use(credentialsRouter);
router.use(secureNotesRouter);

export default router;