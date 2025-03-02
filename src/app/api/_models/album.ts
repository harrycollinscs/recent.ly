import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
  _id: {
    type: { $oid: String },
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  writers: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
  },
  runtime: {
    type: Number,
  },
  poster: {
    type: String,
  },
  released: {
    type: { $date: { $numberLong: String } },
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
