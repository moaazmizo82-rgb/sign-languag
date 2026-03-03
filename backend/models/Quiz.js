import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  mediaUrl: { type: String, required: true },   // image or video of gesture
  label: { type: String },                      // human-readable label
  correct: { type: Boolean, default: false },   // is this the right answer?
  mlConfidence: { type: Number },               // optional: model confidence
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    question: { type: String, required: true },

    // Link to gesture class (from ML dataset)
    gestureClass: { type: String },             // e.g., "concern", "dolphin"
    f1Score: { type: Number },                  // store F1 from ML eval

    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
    options: [optionSchema],

    timeLimitSec: { type: Number, default: 60 }
  },
  { timestamps: true }
);

export default mongoose.model('Quiz', quizSchema);
