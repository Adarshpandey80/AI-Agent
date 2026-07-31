import { connectDB } from "@/lib/mongodb";
import UserProfile from "@/models/userProfile";

export async function getProfile() {
  await connectDB();

  const profile = await UserProfile.findOne();

  return profile;
}

export async function saveProfile(profile: any) {
  await connectDB();

  await UserProfile.deleteMany({});

  return await UserProfile.create(profile);
}