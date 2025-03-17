import mongoose from "mongoose";
import { Schema } from "mongoose";

const BookSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  fullPlot: {
    type: String,
    required: true,
  },
  released: {
    type: String,
    required: true,
  },
  writers: {
    type: [String],
    required: true,
  },
  genres: {
    type: [String],
  },
  lastupdated: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  rated: {
    type: String,
    required: true,
  },
  countries: {
    type: [String],
    required: true,
  },
});

export default mongoose.models.books || mongoose.model("books", BookSchema);
