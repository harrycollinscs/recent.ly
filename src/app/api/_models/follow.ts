import mongoose, { Schema } from "mongoose";

const FollowSchema = new mongoose.Schema({
  followerId: { type: Schema.Types.ObjectId, ref: "User" },
  followingId: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.models.follows ||
  mongoose.model("follows", FollowSchema);
