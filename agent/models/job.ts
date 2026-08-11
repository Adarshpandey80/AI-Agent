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

    location: {
      type: String,
      default: "",
    },

    platform: {
      type: String,
      default: "",
    },

    url: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
      default: "",
    },

    matchScore: {
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
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Job || model("Job", JobSchema);