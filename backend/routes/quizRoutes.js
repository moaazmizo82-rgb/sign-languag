import { Router } from "express";
import {
  listQuizzes,
  getQuiz,
  createQuiz,
  submitQuiz,
} from "../controllers/quizController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

// Public endpoints
router.get("/", listQuizzes);
router.get("/:id", getQuiz);

// Protected: only authenticated users can create quizzes
router.post("/", requireAuth, createQuiz);

// Submit answers
router.post("/:id/submit", submitQuiz);

export default router;
