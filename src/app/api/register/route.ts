import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/register - Register for a course
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Extract data from the multi-step form
    const {
      // Course selection
      courseId,
      category,
      
      // Personal information
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      city,
      postalCode,
      
      // Education
      highestQualification,
      institution,
      fieldOfStudy,
      yearOfCompletion,
      
      // Work experience
      employmentStatus,
      employer,
      jobTitle,
      yearsOfExperience,
      
      // Payment
      couponCode,
      paymentMethod,
      finalPrice
    } = data;
    
    // First, check if the course exists
    try {
      console.log('Looking for course with ID:', courseId);
      const course = await prisma.course.findUnique({
        where: { id: parseInt(courseId) },
        select: { regularPrice: true, salePrice: true }
      });
      
      console.log('Course found:', course);
      
      if (!course) {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        );
      }
    } catch (err) {
      console.error('Error finding course:', err);
      return NextResponse.json(
        { error: 'Error finding course', details: err instanceof Error ? err.message : String(err) },
        { status: 500 }
      );
    }
    
    // Check if user exists, if not create a new user
    let user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          zipCode: postalCode, // Using zipCode field from schema
          role: 'student'
        }
      });
    }
    
    // Create the registration
    const registration = await prisma.registration.create({
      data: {
        userId: user.id,
        courseId: parseInt(courseId),
        status: 'pending',
        finalPrice: parseFloat(finalPrice),
        
        // Personal Information
        firstName,
        lastName,
        email,
        phone,
        gender,
        dateOfBirth,
        address,
        city,
        postalCode: postalCode || '',
        
        // Education & Experience
        highestQualification,
        institution,
        fieldOfStudy,
        yearOfCompletion,
        employmentStatus,
        employer,
        jobTitle,
        yearsOfExperience,
        
        // Payment Information
        paymentMethod,
        
        // Legacy fields for compatibility
        educationLevel: `${highestQualification || ''} in ${fieldOfStudy || ''} from ${institution || ''} ${yearOfCompletion ? `(${yearOfCompletion})` : ''}`.trim(),
        workExperience: employmentStatus ? 
          `${employmentStatus}${employer ? ` at ${employer}` : ''}${jobTitle ? ` as ${jobTitle}` : ''}${yearsOfExperience ? ` with ${yearsOfExperience} years of experience` : ''}`.trim() : 
          '',
        specialRequirements: `Payment Method: ${paymentMethod}`,
        couponId: null,
        
        // Additional fields
        additionalProducts: null as any,
        categorySpecificData: null as any,
        hearAboutUs: null as any,
        approvedById: null,
        approvalDate: null
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      data: {
        registrationId: registration.id,
        user: {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`
        }
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process registration' },
      { status: 500 }
    );
  }
}
