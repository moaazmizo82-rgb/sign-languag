import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/sign', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/signs/${req.file.filename}`;
  res.status(201).json({ fileUrl });
});

export default router;
