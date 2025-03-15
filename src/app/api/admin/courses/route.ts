import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

interface CourseData {
  id: number;
  title: string;
  slug: string;
  status: string;
  regularPrice: number;
  createdAt: Date;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

interface FormattedCourse extends Omit<CourseData, 'categoryId'> {
  category: { name: string };
}

// GET /api/admin/courses - Get all courses for admin
export async function GET(request: NextRequest) {
  try {
    console.log("Fetching courses from database...");
    // Fetch courses with proper field mapping based on the Prisma schema
    const courses: CourseData[] = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        regularPrice: true,
        createdAt: true,
        categoryId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    console.log(`Found ${courses.length} courses`);

    // Get all unique category IDs from the courses
    const categoryIds = Array.from(new Set(courses.map((course) => course.categoryId)));
    console.log(`Unique category IDs: ${categoryIds.join(', ')}`);
    
    // Fetch category names for all courses at once
    const categories: Category[] = await prisma.courseCategory.findMany({
      where: {
        id: {
          in: categoryIds
        }
      },
      select: {
        id: true,
        name: true
      }
    });
    
    console.log(`Found ${categories.length} categories`);
    
    // Create a map of category IDs to names for quick lookup
    const categoryMap: Record<number, string> = categories.reduce((map: Record<number, string>, category) => {
      map[category.id] = category.name;
      return map;
    }, {} as Record<number, string>);
    
    // Format the response with category names
    const formattedCourses = courses.map((course) => {
      const formattedCourse: FormattedCourse = {
        id: course.id,
        title: course.title,
        slug: course.slug,
        status: course.status,
        regularPrice: course.regularPrice,
        createdAt: course.createdAt,
        category: { 
          name: categoryMap[course.categoryId] || 'Unknown' 
        }
      };
      return formattedCourse;
    });

    console.log("Returning formatted courses");
    return NextResponse.json(formattedCourses);
  } catch (error) {
    console.error("Error fetching courses for admin:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

// POST /api/admin/courses - Create a new course
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.categoryId) {
      return NextResponse.json(
        { error: "Title and category are required" },
        { status: 400 }
      );
    }
    
    // Generate slug from title if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    
    // Create the course
    const course = await prisma.course.create({
      data: {
        title: data.title,
        slug: data.slug,
        categoryId: data.categoryId,
        shortDescription: data.shortDescription || '',
        longDescription: data.longDescription || null,
        regularPrice: data.regularPrice || 0,
        status: data.status || 'draft',
        learningOutcomes: data.learningOutcomes || [],
        prerequisites: data.prerequisites || [],
      },
    });
    
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}
