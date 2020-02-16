import express from 'express';
import { login, logout } from '../controllers/login.controllers';
import { CatchAsync, isGuest, isLoggenIn } from '../middleware';
const router = express.Router();

router.post('/login', isGuest, CatchAsync(login));
router.post('/logout', isLoggenIn, CatchAsync(logout));

export default router;
