import Quiz from '../models/Quiz.js';

export const listQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    next(err);
  }
};

export const getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    next(err);
  }
};

export const createQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    next(err);
  }
};

// Accepts: { answers: [indexOfSelectedOption] }
export const submitQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const { answers } = req.body;
    // For single-question quiz (like test1/test4)
    const correctIndex = quiz.options.findIndex((o) => o.correct);
    const score = answers?.[0] === correctIndex ? 1 : 0;

    res.json({ score, total: 1, correctIndex });
  } catch (err) {
    next(err);
  }
};
