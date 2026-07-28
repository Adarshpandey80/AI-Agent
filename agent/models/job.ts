import { Schema, model, models } from "mongoose";

const JobSchema = new Schema(
  {
    company: String,
    title: String,
    location: String,
    platform: String,
    url: String,
    salary: String,
    matchScore: Number,
    status: String,
  },
  {
    timestamps: true,
  }
);

export default models.Job || model("Job", JobSchema);