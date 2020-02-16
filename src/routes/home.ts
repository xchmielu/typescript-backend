import express from 'express';
import { CatchAsync } from '../middleware';
import { home } from '../controllers/home.controllers';
import { isLoggedIn } from '../auth';
const router = express.Router();

router.post('/home', isLoggedIn, CatchAsync(home));

export default router;
