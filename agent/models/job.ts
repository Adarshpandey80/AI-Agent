import { Schema, model, models } from "mongoose";

const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "Remote",
    },

    platform: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    reason: {
      type: String,
      default: "",
    },

    applied: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "Started",
        "Applied",
        "Interview",
        "Rejected",
        "Offer",
        "Failed",
      ],
      default: "Started",
    },
  },
  {
    timestamps: true,
  }
);

// One URL = one job
JobSchema.index({ url: 1 }, { unique: true });

export default models.Job || model("Job", JobSchema);