import express from 'express';
import { registerUser } from '../controllers/register.controllers';
import { isGuest, CatchAsync } from '../middleware';

const router = express.Router();

router.post('/register', isGuest, CatchAsync(registerUser));

export default router;
