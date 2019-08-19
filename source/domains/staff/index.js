// Core
import express from 'express';

// Instruments
import { get, post } from './router';
import { authenticate } from '../../helpers';

export const router = express.Router();

router.get('/', [ authenticate ], get);
router.post('/', post);

export { router as staff };
