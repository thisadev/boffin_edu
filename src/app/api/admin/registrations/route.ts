import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/registrations - Get all registrations
export async function GET(request: NextRequest) {
  try {
    // Authentication is now handled by middleware
    // We can assume if the request reaches here, the user is authenticated

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const categoryId = searchParams.get("categoryId");
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam) : undefined;

    // Build the where clause based on filters
    const where: any = {};
    
    if (status) {
      where.status = status;
    }
    
    if (categoryId) {
      where.course = {
        categoryId: parseInt(categoryId),
      };
    }

    console.log("Fetching registrations with filters:", where, "limit:", limit);

    // Fetch registrations with related data
    const registrations = await prisma.registration.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            address: true,
            city: true,
            state: true,
            zipCode: true,
            country: true,
          },
        },
        course: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        registrationDate: "desc",
      },
      ...(limit ? { take: limit } : {}),
    });

    console.log(`Found ${registrations.length} registrations`);
    
    // Return registrations in a structured format
    return NextResponse.json({
      registrations,
      count: registrations.length,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
