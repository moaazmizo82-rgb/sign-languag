import { Router } from "express";
import {
  listModules,
  getModule,
  createModule,
  updateModule,
  deleteModule,
} from "../controllers/moduleController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

// Public list & get
router.get("/", listModules);
router.get("/:id", getModule);

// Authenticated create/update/delete
router.post("/", requireAuth, createModule);
router.put("/:id", requireAuth, updateModule);
router.delete("/:id", requireAuth, deleteModule);

export default router;
