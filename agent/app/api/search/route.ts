import { NextResponse } from "next/server";
import { searchJobs } from "@/services/searchService";

export async function POST() {
  try {
    const jobs = await searchJobs();

    return NextResponse.json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Search failed",
      },
      {
        status: 500,
      }
    );
  }
}