// Core
import express from 'express';

// Instruments
import { get, post } from './router';
import { staffOnly, validator } from '../../helpers';

// Schema
import { createStaff } from '../../schemas';

export const router = express.Router();

router.get('/', [ staffOnly ], get);
router.post('/', [ validator(createStaff) ], post);

export { router as staff };
