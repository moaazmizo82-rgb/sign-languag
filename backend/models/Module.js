import mongoose from "mongoose";

const signItemSchema = new mongoose.Schema({
  key: { type: String, required: true },
  label: { type: String, required: true },
  imageUrl: String,
  videoUrl: String,
  avatarAnimationId: String,
});

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["letters", "colors", "numbers", "sentences"],
      required: true,
    },
    description: String,
    coverImage: String,
    signs: [signItemSchema],
    isPublished: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // NEW
  },
  { timestamps: true },
);

export default mongoose.model("Module", moduleSchema);
