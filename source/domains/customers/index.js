// Core
import express from 'express';

// Instruments
import { get, post } from './router';
import { getByHash, updateByHash, removeByHash } from './hash';
import { staffOnly, userOnly, validator } from '../../helpers';

// Schema
import { createCustomer, updateCustomer } from '../../schemas';

export const router = express.Router();

router.get('/', [ staffOnly ], get);
router.post('/', [ validator(createCustomer) ], post);

router.get('/:customerHash',  [ userOnly ], getByHash);
router.put('/:customerHash', [ userOnly, validator(updateCustomer) ], updateByHash);
router.delete('/:customerHash', [ userOnly ], removeByHash);

export { router as customers };
