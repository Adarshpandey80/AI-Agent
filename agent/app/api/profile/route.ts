import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import UserProfile from "@/models/userProfile";

export async function GET() {
  await connectDB();

  const profile = await UserProfile.findOne();

  return NextResponse.json(profile);
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.fullName || !body.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name and email are required.",
        },
        { status: 400 }
      );
    }

    await UserProfile.deleteMany({});

    const profile = await UserProfile.create(body);

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error: any) {
    console.error("Profile save failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to save profile.",
      },
      { status: 500 }
    );
  }
}