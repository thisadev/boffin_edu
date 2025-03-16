import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get recent registrations with user and course data
    const recentRegistrations = await prisma.registration.findMany({
      take: 10,
      orderBy: {
        registrationDate: 'desc'
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        course: {
          select: {
            title: true
          }
        }
      }
    });

    // Format the data for the frontend
    const formattedRegistrations = recentRegistrations.map(reg => ({
      id: reg.id,
      studentName: `${reg.user.firstName} ${reg.user.lastName}`,
      studentEmail: reg.user.email,
      courseName: reg.course.title,
      date: reg.registrationDate,
      status: reg.status,
      finalPrice: reg.finalPrice
    }));

    return NextResponse.json(formattedRegistrations);
  } catch (error) {
    console.error("Error fetching recent registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent registrations" },
      { status: 500 }
    );
  }
}
