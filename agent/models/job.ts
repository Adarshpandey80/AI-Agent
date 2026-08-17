import { Schema, model, models } from "mongoose";

const JobSchema = new Schema(
  {
    externalId: {
      type: String,
      default: "",
    },

    company: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
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
      unique: true,
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
        "Saved",
        "Applied",
        "Interview",
        "Rejected",
        "Offer",
      ],
      default: "Saved",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Job ||
  model("Job", JobSchema);