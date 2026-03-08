import User from "../models/User.js";
import Module from "../models/Module.js";
import Quiz from "../models/Quiz.js";

// Module CRUD
// controllers/adminController.js


// ✅ Define and export updateModule
export const updateModule = async (req, res, next) => {
  try {
    const mod = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mod) return res.status(404).json({ error: 'Module not found' });
    res.json(mod);
  } catch (err) {
    next(err);
  }
};

// ...make sure you also export createModule, deleteModule, etc.

export const createModule = async (req, res, next) => {
  /* ... */
};
export const deleteModule = async (req, res, next) => {
  try {
    const mod = await Module.findByIdAndDelete(req.params.id);
    if (!mod) return res.status(404).json({ error: "Module not found" });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Quiz CRUD
export const createQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    next(err);
  }
};

export const updateQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    next(err);
  }
};

export const deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// User management
export const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Bulk import quizzes from ML results
export const bulkImportQuizzes = async (req, res, next) => {
  try {
    const { results } = req.body;
    if (!Array.isArray(results))
      return res.status(400).json({ error: "Results must be an array" });

    const quizzes = await Promise.all(
      results.map((r) =>
        Quiz.create({
          title: `Gesture Quiz: ${r.gestureClass}`,
          question: `Which gesture represents "${r.gestureClass}"?`,
          gestureClass: r.gestureClass,
          f1Score: r.f1Score,
          options: [],
          timeLimitSec: 45,
        }),
      ),
    );

    res.status(201).json({ message: "Quizzes imported", quizzes });
  } catch (err) {
    next(err);
  }
};
