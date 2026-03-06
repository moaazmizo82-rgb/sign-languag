import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  mediaUrl: { type: String, required: true },   // image or video
  label: { type: String },
  correct: { type: Boolean, default: false },
  mlConfidence: { type: Number }
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    question: { type: String, required: true },
    gestureClass: { type: String },   // ML class name
    f1Score: { type: Number },        // ML F1 score
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
    options: [optionSchema],
    timeLimitSec: { type: Number, default: 60 }
  },
  { timestamps: true }
);

export default mongoose.model('Quiz', quizSchema);
