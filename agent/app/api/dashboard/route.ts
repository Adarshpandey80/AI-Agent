import { NextResponse } from "next/server";
import { getDashboardStats } from "@/services/jobService";

export async function GET() {
  try {
    const stats = await getDashboardStats();

    return NextResponse.json(stats);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Dashboard error",
      },
      {
        status: 500,
      }
    );
  }
}