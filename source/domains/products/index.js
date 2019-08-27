// Core
import express from 'express';

// Instruments
import { get, post } from './router';
import { getByHash, updateByHash, removeByHash } from './hash';
import { staffOnly, validator } from '../../helpers';

// Schema
import { createProduct, updateProduct } from '../../schemas';

export const router = express.Router();

router.get('/', get);
router.post('/', [ staffOnly, validator(createProduct) ], post);

router.get('/:productHash', getByHash);
router.put('/:productHash', [ staffOnly, validator(updateProduct) ], updateByHash);
router.delete('/:productHash', [ staffOnly ], removeByHash);

export { router as products };
