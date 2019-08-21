// Core
import express from 'express';

// Instruments
import { get, post } from './router';
import { getByHash, updateByHash, removeByHash } from './hash';
import { authenticate } from '../../helpers';

export const router = express.Router();

router.get('/', [ authenticate ], get);
router.post('/', [ authenticate ], post);

router.get('/:productHash', [ authenticate ], getByHash);
router.put('/:productHash', [ authenticate ], updateByHash);
router.delete('/:productHash', [ authenticate ], removeByHash);

export { router as orders };
