import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UserProfile from "@/models/userProfile";

export async function GET() {
  await connectDB();

  const profile = await UserProfile.findOne();

  return NextResponse.json(profile);
}

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  await UserProfile.deleteMany({});

  const profile = await UserProfile.create(body);

  return NextResponse.json({
    success: true,
    profile,
  });
}