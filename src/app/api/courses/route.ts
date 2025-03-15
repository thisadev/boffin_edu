import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/courses - Get all courses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let courses;
    
    if (category) {
      const categoryObj = await prisma.courseCategory.findFirst({
        where: {
          slug: category,
        },
      });
      
      if (!categoryObj) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }
      
      courses = await prisma.course.findMany({
        where: {
          categoryId: categoryObj.id,
          status: 'published',
        },
        include: {
          category: true,
        },
      });
    } else {
      courses = await prisma.course.findMany({
        where: {
          status: 'published',
        },
        include: {
          category: true,
        },
      });
    }
    
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// POST /api/courses - Create a new course (admin only)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Here you would add authorization checks to ensure only admins can create courses
    
    const course = await prisma.course.create({
      data,
    });
    
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
