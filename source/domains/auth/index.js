// Core
import express from 'express';

// Instruments
import { limiter } from '../../helpers';

// Handlers
import { post } from './router';

const router = express.Router();
const timeout = 5 * 60 * 1000; // 5 min

router.post('/login', [ limiter(3, timeout) ], post);

export { router as auth };
