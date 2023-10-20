/* eslint-disable @typescript-eslint/no-misused-promises */
import { signIn, signUp } from '@controllers/auth.controller';
import { Router } from 'express';

const router: Router = Router();

router.post('/register', signUp);

router.post('/login', signIn);

export default router;
