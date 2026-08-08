import { NextRequest, NextResponse } from "next/server";
import {updateJobStatus, getJobById} from "@/services/jobService";
import {getJob} from "@/services/jobService";



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { jobId } = body;

    console.log("Applying for:", jobId);

    /*
        Later

        const job = await getJob(jobId);

        await applyAgent(job);

        await updateJobStatus(jobId,"Applied");
    */

    return NextResponse.json({
      success: true,
      message: "Application started",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Apply failed",
      },
      {
        status: 500,
      }
    );
  }
}