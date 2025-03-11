import mongoose from "mongoose";
import { Schema } from "mongoose";

const AlbumSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  writers: {
    type: [String],
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  runtime: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  released: {
    type: { $date: { $numberLong: String } },
    required: true,
  },
  lastupdated: {
    type: String,
    required: true,
  },
  year: {
    type: { $numberInt: String },
  },
  rated: {
    type: String,
  },
});

export default mongoose.models.albums || mongoose.model("albums", AlbumSchema);
