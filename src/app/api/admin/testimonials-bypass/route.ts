import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch all testimonials with related data (no authentication check)
export async function GET() {
  try {
    console.log("Fetching all testimonials for admin panel (bypass auth)");

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

// POST: Create a new testimonial (no authentication check)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.registrationId) {
      return NextResponse.json({ error: "Registration ID is required" }, { status: 400 });
    }

    if (!data.content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    console.log("Creating new testimonial:", data);

    // Create the testimonial
    const testimonial = await prisma.testimonial.create({
      data: {
        registrationId: parseInt(data.registrationId),
        content: data.content,
        rating: data.rating ? parseInt(data.rating) : 5, // Default to 5 if not provided
        designation: data.designation || null,
        workplace: data.workplace || null,
        university: data.university || null,
      },
    });

    console.log("Testimonial created:", testimonial.id);
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
