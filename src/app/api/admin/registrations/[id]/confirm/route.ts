import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// PUT /api/admin/registrations/[id]/confirm - Confirm a registration
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const registrationId = parseInt(params.id);
    if (isNaN(registrationId)) {
      return NextResponse.json({ error: "Invalid registration ID" }, { status: 400 });
    }

    // Check if registration exists
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
    });

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    // Get admin user ID from session if available
    let approvedById = null;
    if (session.user && session.user.id) {
      approvedById = parseInt(session.user.id.toString());
    }

    // Update registration status to confirmed
    const updatedRegistration = await prisma.registration.update({
      where: { id: registrationId },
      data: {
        status: "confirmed",
        approvedById: approvedById,
        approvalDate: new Date(),
      },
    });

    return NextResponse.json(updatedRegistration);
  } catch (error) {
    console.error("Error confirming registration:", error);
    return NextResponse.json(
      { error: "Failed to confirm registration" },
      { status: 500 }
    );
  }
}
