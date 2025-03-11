import mongoose, { Schema } from "mongoose";

const GameSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  developers: {
    type: [String],
    required: true,
  },
  platforms: {
    type: [String],
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
})

export default mongoose.models.game || mongoose.model("game", GameSchema);
