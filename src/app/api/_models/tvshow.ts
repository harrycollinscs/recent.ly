import mongoose from "mongoose";

const TvShowSchema = new mongoose.Schema({
  _id: {
    type: { $oid: String },
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  cast: {
    type: [String],
    required: true,
  },
  seasons: {
    type: Number,
    required: true,
  },
  episodes: {
    type: Number,
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
    type: { $date: { $numberLong: String } },
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

export default mongoose.models.tvshows || mongoose.model("tvshows", TvShowSchema);
