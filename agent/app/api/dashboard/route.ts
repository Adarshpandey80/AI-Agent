import { NextResponse } from "next/server";
import { saveJobs } from "@/services/jobService";

export async function GET() {
  try {
    const stats = await saveJobs([]);

    return NextResponse.json(stats);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load dashboard" },
      { status: 500 }
    );
  }
}