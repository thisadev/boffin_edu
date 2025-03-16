import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET: Fetch all testimonials with related data
export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Fetching all testimonials for admin panel");

    // Fetch all testimonials with registration, user, and course data
    const testimonials = await prisma.testimonial.findMany({
      include: {
        registration: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
            course: {
              select: {
                title: true,
              },
            },
          },
        },
      },
      orderBy: [
        { isFeatured: "desc" },
        { createdAt: "desc" },
      ],
    });

    console.log(`Found ${testimonials.length} testimonials`);
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// POST: Create a new testimonial
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get request body
    const data = await request.json();
    console.log("Creating new testimonial with data:", data);

    // Validate required fields
    if (!data.registrationId || !data.content || !data.rating) {
      console.log("Missing required fields:", {
        registrationId: !!data.registrationId,
        content: !!data.content,
        rating: !!data.rating
      });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create testimonial
    const testimonial = await prisma.testimonial.create({
      data: {
        registrationId: parseInt(data.registrationId),
        content: data.content,
        rating: parseInt(data.rating),
        designation: data.designation || null,
        workplace: data.workplace || null,
        university: data.university || null,
        profileImageUrl: data.profileImageUrl || null,
        isActive: data.isActive,
        isFeatured: data.isFeatured,
      },
    });

    console.log("Testimonial created successfully:", testimonial.id);
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
