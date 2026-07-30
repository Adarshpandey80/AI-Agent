import { Schema, model, models } from "mongoose";

const UserProfileSchema = new Schema(
  {
    roles: [String],
    skills: [String],
    countries: [String],
    experience: String,
  },
  {
    timestamps: true,
  }
);

export default models.UserProfile ||
  model("UserProfile", UserProfileSchema);