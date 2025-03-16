import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET: Fetch a specific testimonial by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Fetch testimonial with registration, user, and course data
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
    console.error("Error fetching testimonial:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonial" },
      { status: 500 }
    );
  }
}

// PUT: Update a testimonial
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const data = await request.json();
    console.log(`Updating testimonial ${id} with data:`, data);

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

    // Check if testimonial exists
    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!existingTestimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    // Update testimonial
    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
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

    console.log(`Testimonial ${id} updated successfully`);
    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE: Delete a testimonial
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    console.log(`Deleting testimonial ${id}`);

    // Check if testimonial exists
    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!existingTestimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    // Delete testimonial
    await prisma.testimonial.delete({
      where: { id },
    });

    console.log(`Testimonial ${id} deleted successfully`);
    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
