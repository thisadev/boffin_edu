import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const currentYear = new Date().getFullYear();
    
    // Create an array of all months in the current year
    const months = [];
    for (let month = 0; month < 12; month++) {
      const startDate = new Date(currentYear, month, 1);
      const endDate = new Date(currentYear, month + 1, 0);
      
      months.push({
        month: month + 1, // 1-12
        name: startDate.toLocaleString('default', { month: 'short' }),
        startDate,
        endDate
      });
    }
    
    // Query registrations for each month
    const monthlyData = await Promise.all(
      months.map(async ({ month, name, startDate, endDate }) => {
        const count = await prisma.registration.count({
          where: {
            registrationDate: {
              gte: startDate,
              lte: endDate
            }
          }
        });
        
        return {
          month,
          name,
          count
        };
      })
    );
    
    return NextResponse.json(monthlyData);
  } catch (error) {
    console.error("Error fetching monthly registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch monthly registration data" },
      { status: 500 }
    );
  }
}
