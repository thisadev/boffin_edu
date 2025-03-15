import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import * as XLSX from 'xlsx';

// GET /api/admin/registrations/export - Export registrations to Excel
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const categoryId = searchParams.get("categoryId");

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

    // Fetch registrations with related data
    const registrations = await prisma.registration.findMany({
      where,
      include: {
        user: true,
        course: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        registrationDate: "desc",
      },
    });

    // Transform data for Excel export
    const excelData = registrations.map(reg => ({
      'Registration ID': reg.id,
      'Status': reg.status.charAt(0).toUpperCase() + reg.status.slice(1),
      'Registration Date': new Date(reg.registrationDate).toLocaleDateString(),
      'First Name': reg.user.firstName,
      'Last Name': reg.user.lastName,
      'Email': reg.user.email,
      'Phone': reg.user.phone || 'N/A',
      'Address': reg.user.address || 'N/A',
      'City': reg.user.city || 'N/A',
      'State': reg.user.state || 'N/A',
      'Zip Code': reg.user.zipCode || 'N/A',
      'Country': reg.user.country || 'N/A',
      'Course': reg.course.title,
      'Category': reg.course.category.name,
      'Price Paid': `$${reg.finalPrice.toFixed(2)}`,
      'Education Level': reg.educationLevel || 'N/A',
      'Work Experience': reg.workExperience || 'N/A',
      'Special Requirements': reg.specialRequirements || 'N/A',
      'Approval Date': reg.approvalDate ? new Date(reg.approvalDate).toLocaleDateString() : 'N/A',
    }));

    // Create Excel workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');
    
    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    
    // Set filename based on filters
    let filename = 'registrations';
    if (categoryId) {
      const category = await prisma.courseCategory.findUnique({
        where: { id: parseInt(categoryId) },
      });
      if (category) {
        filename += `_${category.name.toLowerCase().replace(/\s+/g, '-')}`;
      }
    }
    if (status) {
      filename += `_${status}`;
    }
    filename += `_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Return Excel file as response
    return new NextResponse(excelBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error exporting registrations:", error);
    return NextResponse.json(
      { error: "Failed to export registrations" },
      { status: 500 }
    );
  }
}
