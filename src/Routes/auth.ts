import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../Controllers/auth';

const router = Router();

router.post(
	'/signup',
	[body('email').isEmail(), body('password').isLength({ min: 6 })],
	authController.signup
);

export default router;
