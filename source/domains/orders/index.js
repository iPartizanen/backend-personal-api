// Core
import express from 'express';

// Instruments
import { get, post } from './router';
import { getByHash, updateByHash, removeByHash } from './hash';
import { authenticate, validator } from '../../helpers';

// Schema
import { createOrder, updateOrder } from '../../schemas';

export const router = express.Router();

router.get('/', [ authenticate ], get);
router.post('/', [ authenticate, validator(createOrder) ], post);

router.get('/:orderHash', [ authenticate ], getByHash);
router.put('/:orderHash', [ authenticate, validator(updateOrder) ], updateByHash);
router.delete('/:orderHash', [ authenticate ], removeByHash);

export { router as orders };
