import mongoose, { Schema } from "mongoose";

const MovieSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  cast: {
    type: [String],
    required: true,
  },
  writers: {
    type: [String],
    required: true,
  },
  directors: {
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
    type: String,
    required: true,
  },
  lastupdated: {
    type: String,
    required: true,
  },
  year: {
    type: { $numberInt: String },
    required: true,
  },
  rated: {
    type: String,
  },
  plot: {
    type: String,
    required: true,
  },
  fullPlot: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  countries: {
    type: [String],
    required: true,
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
});

export default mongoose.models.movies || mongoose.model("movies", MovieSchema);
