import { Schema, model, models } from "mongoose";

const ApplicationSchema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
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

    appliedAt: {
      type: Date,
       default: null,
    },

    resumeUsed: String,

    coverLetterUsed: String,

    portalResponse: String,

    notes: String,
  },
  {
    timestamps: true,
  }
);

export default models.Application ||
  model("Application", ApplicationSchema);