import express from 'express';
import { verify } from '../controllers/verifyUser.controllers';
import { CatchAsync } from '../middleware';

const router = express.Router();

router.get('/veritify/:id', CatchAsync(verify));

export default router;
