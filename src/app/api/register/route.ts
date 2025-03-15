import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/register - Register for a course
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { courseId, userData, specialRequirements, educationLevel, workExperience, hearAboutUs, categorySpecificData } = data;
    
    // First, check if the course exists
    const course = await prisma.course.findUnique({
      where: { id: parseInt(courseId) },
      select: { regularPrice: true, salePrice: true }
    });
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // Check if user exists, if not create a new user
    let user = await prisma.user.findUnique({
      where: { email: userData.email }
    });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          city: userData.city,
          state: userData.state,
          zipCode: userData.zipCode,
          country: userData.country,
          role: 'student'
        }
      });
    }
    
    // Calculate the final price (using sale price if available)
    const finalPrice = course.salePrice || course.regularPrice;
    
    // Create the registration
    const registration = await prisma.registration.create({
      data: {
        userId: user.id,
        courseId: parseInt(courseId),
        finalPrice,
        specialRequirements,
        educationLevel,
        workExperience,
        hearAboutUs,
        categorySpecificData: categorySpecificData ? JSON.parse(JSON.stringify(categorySpecificData)) : undefined,
        status: 'pending'
      }
    });
    
    return NextResponse.json({
      success: true,
      registration,
      message: 'Registration submitted successfully. Our team will contact you shortly.'
    }, { status: 201 });
  } catch (error) {
    console.error('Error processing registration:', error);
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    );
  }
}
