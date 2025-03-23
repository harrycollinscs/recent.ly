import mongoose from "mongoose";
import { Schema } from "mongoose";

const MediaSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
  },
  writers: {
    type: [String],
  },
  genres: {
    type: [String],
  },
  type: {
    type: String,
    required: true,
  },
  runtime: {
    type: Number,
  },
  image: {
    type: String,
    required: true,
  },
  released: {
    type: String,
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
  plot: {
    type: String,
  },
  fullPlot: {
    type: String,
  },
  languages: {
    type: [String],
  },
  countries: {
    type: [String],
  },
  developers: {
    type: [String],
  },
  platforms: {
    type: [String],
  },
  cast: {
    type: [String],
  },
  directors: {
    type: [String],
  },
  awards: {
    type: {
      wins: Number,
      nominations: Number,
      text: String,
    },
  },
  imdb: {
    type: {
      rating: Number,
      votes: Number,
      id: Number,
    },
  },
  seasons: {
    type: Number,
  },
  episodes: {
    type: Number,
  },
});

export default mongoose.models.media || mongoose.model("media", MediaSchema);
