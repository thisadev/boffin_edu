import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  try {
    // For now, return mock data since we're focusing on authentication
    return NextResponse.json({
      totalCourses: 3,
      totalCategories: 3,
      totalRegistrations: 0,
      totalInstructors: 1,
      pendingRegistrations: 0,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin statistics" },
      { status: 500 }
    );
  }
}
