import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch a specific testimonial by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    console.log(`Fetching testimonial with ID: ${id} (bypass auth)`);

    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
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

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error(`Error fetching testimonial:`, error);
    return NextResponse.json(
      { error: "Failed to fetch testimonial", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// PUT: Update a testimonial by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const data = await request.json();

    console.log(`Updating testimonial with ID: ${id}`, data);

    // Validate required fields
    if (!data.registrationId) {
      return NextResponse.json({ error: "Registration ID is required" }, { status: 400 });
    }

    if (!data.content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    // Update the testimonial
    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        registrationId: parseInt(data.registrationId),
        content: data.content,
        rating: data.rating ? parseInt(data.rating) : 5, // Default to 5 if not provided
        designation: data.designation || null,
        workplace: data.workplace || null,
        university: data.university || null,
      },
    });

    console.log(`Testimonial updated: ${id}`);
    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    console.error(`Error updating testimonial:`, error);
    return NextResponse.json(
      { error: "Failed to update testimonial", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE: Delete a testimonial by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    console.log(`Deleting testimonial with ID: ${id}`);

    // Delete the testimonial
    await prisma.testimonial.delete({
      where: { id },
    });

    console.log(`Testimonial deleted: ${id}`);
    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error(`Error deleting testimonial:`, error);
    return NextResponse.json(
      { error: "Failed to delete testimonial", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
