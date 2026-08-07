import { NextResponse } from "next/server";
import { getJobs } from "@/services/jobService";

export async function GET() {
  try {
    const jobs = await getJobs();

    return NextResponse.json(jobs);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch jobs",
      },
      {
        status: 500,
      }
    );
  }
}