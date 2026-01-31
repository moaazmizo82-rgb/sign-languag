import { Router } from 'express';
import { textToSign, signToText } from '../controllers/conversionController.js';

const router = Router();

router.post('/text-to-sign', textToSign);
router.post('/sign-to-text', signToText);

export default router;
