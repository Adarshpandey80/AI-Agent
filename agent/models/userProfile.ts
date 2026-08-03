import { Schema, model, models } from "mongoose";

const UserProfileSchema = new Schema(
  {
    // Personal Information
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: String,

    // Professional Links
    linkedin: String,

    github: String,

    portfolio: String,

    // AI Job Search Preferences
    roles: {
      type: [String],
      default: [],
    },

    skills: {
      type: [String],
      default: [],
    },

    countries: {
      type: [String],
      default: [],
    },

    experience: {
      type: String,
      default: "Entry Level",
    },

    jobTypes: {
      type: [String],
      default: [],
    },

    remoteOnly: {
      type: Boolean,
      default: false,
    },

    // Documents
    resumeUrl: String,

    coverLetter: String,
  },
  {
    timestamps: true,
  }
);

export default models.UserProfile ||
  model("UserProfile", UserProfileSchema);