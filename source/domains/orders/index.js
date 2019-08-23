// Core
import express from 'express';

// Instruments
import { get, post } from './router';
import { getByHash, updateByHash, removeByHash } from './hash';
import { authenticate } from '../../helpers';

export const router = express.Router();

router.get('/', [ authenticate ], get);
router.post('/', [ authenticate ], post);

router.get('/:orderHash', [ authenticate ], getByHash);
router.put('/:orderHash', [ authenticate ], updateByHash);
router.delete('/:orderHash', [ authenticate ], removeByHash);

export { router as orders };
