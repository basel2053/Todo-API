import { Router } from 'express';
import * as authController from '../Controllers/auth';
import validateCredentials from '../middleware/validateCredentials';

const router = Router();

router.post('/signup', validateCredentials, authController.signup);

router.post('/login', validateCredentials, authController.login);

export default router;
