import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Get counts from the database
    const [totalCourses, totalCategories, totalRegistrations, pendingRegistrations] = await Promise.all([
      prisma.course.count(),
      prisma.courseCategory.count(),
      prisma.registration.count(),
      prisma.registration.count({
        where: {
          status: "pending"
        }
      })
    ]);

    // Calculate completed registrations
    const completedRegistrations = totalRegistrations - pendingRegistrations;

    // Get instructor count (for now, we'll just use a placeholder)
    const totalInstructors = await prisma.courseInstructor.count();

    return NextResponse.json({
      totalCourses,
      totalCategories,
      totalRegistrations,
      totalInstructors,
      pendingRegistrations,
      completedRegistrations
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin statistics" },
      { status: 500 }
    );
  }
}
