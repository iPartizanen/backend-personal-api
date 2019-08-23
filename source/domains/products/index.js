// Core
import express from 'express';

// Instruments
import { get, post } from './router';
import { getByHash, updateByHash, removeByHash } from './hash';
import { staffOnly } from '../../helpers';

export const router = express.Router();

router.get('/', get);
router.post('/', [ staffOnly ], post);

router.get('/:productHash', getByHash);
router.put('/:productHash', [ staffOnly ], updateByHash);
router.delete('/:productHash', [ staffOnly ], removeByHash);

export { router as products };
