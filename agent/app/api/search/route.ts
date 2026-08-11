import { NextResponse } from "next/server";
import { searchJobsDetailed } from "@/services/searchService";

export async function POST() {
  try {
    const result = await searchJobsDetailed();

    return NextResponse.json({
      success: true,
      count: result.jobs.length,
      jobs: result.jobs,
      warnings: result.warnings,
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