import { Schema, model, models } from "mongoose";

const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    location: String,

    platform: String,

    url: {
      type: String,
      // required: true,
    },

    description: String,

    salary: String,

    matchScore: Number,

    reason: String,

    status: {
      type: String,
      default: "Pending",
      // Pending | Applied | Rejected | Saved
    },

    applied: {
      type: Boolean,
      default: false,
    },

    appliedAt: Date,
  },
  {
    timestamps: true,
  }
);

export default models.Job || model("Job", JobSchema);