import { Router } from 'express';
import { listQuizzes, getQuiz, createQuiz, submitQuiz } from '../controllers/quizController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', listQuizzes);
router.get('/:id', getQuiz);
router.post('/', requireAuth, createQuiz);
router.post('/:id/submit', submitQuiz);

export default router;
