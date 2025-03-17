import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followingCount: {
    type: Number,
    default: 0,
    required: false,
  },
  followerCount: {
    type: Number,
    default: 0,
    required: false,
  },
});

export default mongoose.models.users || mongoose.model("users", UserSchema);
