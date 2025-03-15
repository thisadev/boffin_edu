import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch testimonials that are active, including the related registration and user data
    const testimonials = await prisma.testimonial.findMany({
      where: {
        isActive: true,
      },
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
        { isFeatured: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    // Transform the data to include only what we need for the frontend
    const formattedTestimonials = testimonials.map((testimonial) => ({
      id: testimonial.id,
      content: testimonial.content,
      rating: testimonial.rating,
      studentName: `${testimonial.registration.user.firstName} ${testimonial.registration.user.lastName}`,
      courseName: testimonial.registration.course.title,
      designation: testimonial.designation || undefined,
      workplace: testimonial.workplace || undefined,
      university: testimonial.university || undefined,
      profileImageUrl: testimonial.profileImageUrl || undefined,
      isFeatured: testimonial.isFeatured,
    }));

    return NextResponse.json(formattedTestimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}
