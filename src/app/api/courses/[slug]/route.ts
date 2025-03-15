import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/courses/[slug] - Get course by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Ensure params.slug is properly typed
    const slug = params.slug;
    
    const course = await prisma.course.findUnique({
      where: {
        slug: slug,
      },
      include: {
        category: true,
        modules: {
          include: {
            topics: {
              include: {
                learningObjectives: true,
              },
              orderBy: {
                orderIndex: 'asc',
              },
            },
          },
          orderBy: {
            orderIndex: 'asc',
          },
        },
        faqs: {
          orderBy: {
            orderIndex: 'asc',
          },
        },
        reviews: {
          where: {
            isApproved: true,
          },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

// PUT /api/courses/[slug] - Update course (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await request.json();
    
    // Here you would add authorization checks to ensure only admins can update courses
    
    const slug = params.slug;
    const course = await prisma.course.update({
      where: {
        slug: slug,
      },
      data,
    });
    
    return NextResponse.json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

// DELETE /api/courses/[slug] - Delete course (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Here you would add authorization checks to ensure only admins can delete courses
    
    const slug = params.slug;
    await prisma.course.delete({
      where: {
        slug: slug,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}
