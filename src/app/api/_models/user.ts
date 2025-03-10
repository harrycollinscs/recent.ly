import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
  following: {
    type: [{ _id: { type: { $oid: String }, required: true } }],
    default: [],
    required: true,
  },
});

export default mongoose.models.users || mongoose.model("users", UserSchema);
