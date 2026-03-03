import Quiz from "../models/Quiz.js";

// List all quizzes
export const listQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    next(err);
  }
};

// Get single quiz
export const getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    next(err);
  }
};

// Create quiz (with gestureClass + F1 score)
export const createQuiz = async (req, res, next) => {
  try {
    const {
      title,
      question,
      gestureClass,
      f1Score,
      module,
      options,
      timeLimitSec,
    } = req.body;

    const quiz = await Quiz.create({
      title,
      question,
      gestureClass, // e.g. "dolphin"
      f1Score, // e.g. 0.6667
      module,
      options,
      timeLimitSec,
    });

    res.status(201).json(quiz);
  } catch (err) {
    next(err);
  }
};

// Submit quiz answers
export const submitQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    const { answers } = req.body; // array of selected option indexes
    const correctIndex = quiz.options.findIndex((o) => o.correct);

    const score = answers?.[0] === correctIndex ? 1 : 0;

    res.json({
      score,
      total: 1,
      correctIndex,
      gestureClass: quiz.gestureClass,
      f1Score: quiz.f1Score,
    });
  } catch (err) {
    next(err);
  }
};
