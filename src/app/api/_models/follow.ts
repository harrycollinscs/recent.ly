import mongoose, { Schema } from "mongoose";

const FollowSchema = new mongoose.Schema({
  followerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  followingId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

FollowSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

export default mongoose.models.follows ||
  mongoose.model("follows", FollowSchema);
