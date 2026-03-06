import mongoose from "mongoose";

const signSchema = new mongoose.Schema({
  key: { type: String, required: true }, // e.g. "A", "dolphin"
  label: { type: String }, // human-readable name
  imageUrl: { type: String }, // static image
  videoUrl: { type: String }, // video of gesture
  avatarAnimationId: { type: String }, // optional 3D avatar reference
});

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g. "Learning Letters"
    category: { type: String, required: true }, // e.g. "letters", "numbers", "gestures"
    description: { type: String },
    coverImage: { type: String },
    signs: [signSchema], // array of signs in this module
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin who created
  },
  { timestamps: true },
);

export default mongoose.model("Module", moduleSchema);
