import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  label: String,
  correct: { type: Boolean, default: false }
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    question: { type: String, required: true },
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
    options: [optionSchema],
    timeLimitSec: { type: Number, default: 60 } // for timed tests (test1/test4)
  },
  { timestamps: true }
);

export default mongoose.model('Quiz', quizSchema);
