import { Router } from "express";
import {
  createModule,
  updateModule,
  deleteModule,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  listUsers,
  deleteUser,
  bulkImportQuizzes,
} from "../controllers/adminController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

// Module management
router.post("/modules", requireAuth, requireAdmin, createModule);
router.put("/modules/:id", requireAuth, requireAdmin, updateModule);
router.delete("/modules/:id", requireAuth, requireAdmin, deleteModule);

// Quiz management
router.post("/quizzes", requireAuth, requireAdmin, createQuiz);
router.put("/quizzes/:id", requireAuth, requireAdmin, updateQuiz);
router.delete("/quizzes/:id", requireAuth, requireAdmin, deleteQuiz);
router.post("/quizzes/import", requireAuth, requireAdmin, bulkImportQuizzes);

// User management
router.get("/users", requireAuth, requireAdmin, listUsers);
router.delete("/users/:id", requireAuth, requireAdmin, deleteUser);

export default router;
