// Core
import express from 'express';

// Instruments
import { get, post } from './router';
import { staffOnly } from '../../helpers';

export const router = express.Router();

router.get('/', [ staffOnly ], get);
router.post('/', post);

export { router as staff };
