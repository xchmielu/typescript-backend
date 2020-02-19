import express from 'express';
import { CatchAsync } from '../middleware';
import { forgot } from '../controllers/forogot.controllers';
const router = express.Router();

router.post('/forogt', CatchAsync(forgot));

export default router;
