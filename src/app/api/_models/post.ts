import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema({
  userId: Schema.Types.ObjectId,
  mediaId: Schema.Types.ObjectId,
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.posts || mongoose.model("posts", PostSchema);
