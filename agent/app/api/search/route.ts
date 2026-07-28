import { NextResponse } from "next/server";
import { searchJobs } from "@/services/searchService";

export async function POST() {
  const jobs = await searchJobs();

  return NextResponse.json({
    success: true,
    count: jobs.length,
  });
}