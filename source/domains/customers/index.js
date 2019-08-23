// Core
import express from 'express';

// Instruments
import { get, post } from './router';
import { getByHash, updateByHash, removeByHash } from './hash';
import { staffOnly, userOnly } from '../../helpers';

export const router = express.Router();

router.get('/', [ staffOnly ], get);
router.post('/', post);

router.get('/:customerHash',  [ userOnly ], getByHash);
router.put('/:customerHash', [ userOnly ], updateByHash);
router.delete('/:customerHash', [ userOnly ], removeByHash);

export { router as customers };
