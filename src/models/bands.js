import mongoose from "mongoose";

const bandsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Bands = mongoose.model("Bands", bandsSchema);
