import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Define interfaces for type safety
interface CourseWithRelations {
  id: number;
  title: string;
  shortDescription: string;
  slug: string;
  featuredImageUrl: string | null;
  level: string | null;
  deliveryMode: string | null;
  durationWeeks: number | null;
  durationHours: number | null;
  regularPrice: number;
  salePrice: number | null;
  status: string;
  categoryId: number;
  learningOutcomes?: string[];
  category: {
    id: number;
    name: string;
    slug: string;
  };
  modules: any[];
  instructors: {
    instructor: {
      id: number;
      name: string;
      profileImageUrl: string | null;
    };
  }[];
}

// GET /api/categories/[slug] - Get category by slug with its courses
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Ensure params.slug is properly typed
    const slug = params.slug;
    
    const category = await prisma.courseCategory.findUnique({
      where: {
        slug: slug,
        isActive: true,
      },
      include: {
        courses: {
          where: {
            status: 'published',
          },
          orderBy: {
            title: 'asc',
          },
          include: {
            category: true,
            modules: {
              select: {
                id: true,
                courseId: true,
                _count: {
                  select: {
                    topics: true,
                  },
                },
              },
            },
            instructors: {
              include: {
                instructor: true,
              },
            },
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Transform the data to match the expected format
    const transformedCategory = {
      id: category.id,
      name: category.name,
      description: category.description,
      slug: category.slug,
      imageUrl: category.imageUrl,
      courses: category.courses.map((course: CourseWithRelations) => ({
        id: course.id,
        title: course.title,
        shortDescription: course.shortDescription,
        slug: course.slug,
        featuredImageUrl: course.featuredImageUrl,
        level: course.level,
        deliveryMode: course.deliveryMode,
        durationWeeks: course.durationWeeks,
        durationHours: course.durationHours,
        regularPrice: course.regularPrice,
        salePrice: course.salePrice,
        categoryId: course.categoryId,
        categoryName: course.category.name,
        categorySlug: course.category.slug,
        moduleCount: course.modules.length,
        instructors: course.instructors.map((ci: any) => ({
          id: ci.instructor.id,
          name: ci.instructor.name,
          profileImageUrl: ci.instructor.profileImageUrl,
        })),
        instructorCount: course.instructors.length,
        learningOutcomes: course.learningOutcomes || [],
      })),
    };

    return NextResponse.json(transformedCategory);
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}
