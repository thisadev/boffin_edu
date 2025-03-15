import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/courses/[id] - Get a specific course with all details
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const courseId = parseInt(params.id);
    if (isNaN(courseId)) {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        category: true,
        modules: {
          orderBy: { orderIndex: "asc" },
          include: {
            topics: {
              orderBy: { orderIndex: "asc" },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/courses/[id] - Update a course
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const courseId = parseInt(params.id);
    if (isNaN(courseId)) {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.categoryId) {
      return NextResponse.json(
        { error: "Title and category are required" },
        { status: 400 }
      );
    }

    // Start a transaction to update the course and its related entities
    const updatedCourse = await prisma.$transaction(async (prisma) => {
      // 1. Update the main course data
      const course = await prisma.course.update({
        where: { id: courseId },
        data: {
          title: data.title,
          slug: data.slug,
          shortDescription: data.shortDescription,
          longDescription: data.longDescription,
          featuredImageUrl: data.featuredImageUrl,
          galleryImages: data.galleryImages,
          learningOutcomes: data.learningOutcomes,
          prerequisites: data.prerequisites,
          targetAudience: data.targetAudience,
          level: data.level,
          deliveryMode: data.deliveryMode,
          language: data.language,
          durationWeeks: parseInt(data.durationWeeks) || 0,
          durationHours: parseInt(data.durationHours) || 0,
          regularPrice: parseFloat(data.regularPrice) || 0,
          salePrice: data.salePrice ? parseFloat(data.salePrice) : null,
          saleStartDate: data.saleStartDate || null,
          saleEndDate: data.saleEndDate || null,
          status: data.status,
          categoryId: parseInt(data.categoryId),
        },
      });

      // 2. If modules are provided, update them
      if (data.modules && Array.isArray(data.modules)) {
        // First, get existing modules to determine which ones to delete
        const existingModules = await prisma.module.findMany({
          where: { courseId },
          select: { id: true },
        });

        const existingModuleIds = existingModules.map((m) => m.id);
        const updatedModuleIds = data.modules
          .filter((m: any) => m.id)
          .map((m: any) => parseInt(m.id));

        // Delete modules that are no longer in the updated data
        const modulesToDelete = existingModuleIds.filter(
          (id) => !updatedModuleIds.includes(id)
        );

        if (modulesToDelete.length > 0) {
          await prisma.module.deleteMany({
            where: { id: { in: modulesToDelete } },
          });
        }

        // Update or create modules
        for (const [index, moduleData] of data.modules.entries()) {
          const moduleId = moduleData.id ? parseInt(moduleData.id) : undefined;
          const topics = moduleData.topics || [];

          // Update or create the module
          const module = moduleId
            ? await prisma.module.update({
                where: { id: moduleId },
                data: {
                  title: moduleData.title,
                  description: moduleData.description,
                  orderIndex: index + 1,
                },
              })
            : await prisma.module.create({
                data: {
                  title: moduleData.title,
                  description: moduleData.description,
                  orderIndex: index + 1,
                  courseId,
                },
              });

          // Handle topics for this module
          if (topics.length > 0) {
            // Get existing topics to determine which ones to delete
            const existingTopics = moduleId
              ? await prisma.topic.findMany({
                  where: { moduleId },
                  select: { id: true },
                })
              : [];

            const existingTopicIds = existingTopics.map((t) => t.id);
            const updatedTopicIds = topics
              .filter((t: any) => t.id)
              .map((t: any) => parseInt(t.id));

            // Delete topics that are no longer in the updated data
            const topicsToDelete = existingTopicIds.filter(
              (id) => !updatedTopicIds.includes(id)
            );

            if (topicsToDelete.length > 0) {
              await prisma.topic.deleteMany({
                where: { id: { in: topicsToDelete } },
              });
            }

            // Update or create topics
            for (const [topicIndex, topicData] of topics.entries()) {
              const topicId = topicData.id ? parseInt(topicData.id) : undefined;

              if (topicId) {
                await prisma.topic.update({
                  where: { id: topicId },
                  data: {
                    title: topicData.title,
                    description: topicData.description,
                    orderIndex: topicIndex + 1,
                    duration: parseInt(topicData.duration) || 0,
                  },
                });
              } else {
                await prisma.topic.create({
                  data: {
                    title: topicData.title,
                    description: topicData.description,
                    orderIndex: topicIndex + 1,
                    duration: parseInt(topicData.duration) || 0,
                    moduleId: module.id,
                  },
                });
              }
            }
          }
        }
      }

      // Return the updated course with all its relations
      return prisma.course.findUnique({
        where: { id: courseId },
        include: {
          category: true,
          modules: {
            orderBy: { orderIndex: "asc" },
            include: {
              topics: {
                orderBy: { orderIndex: "asc" },
              },
            },
          },
        },
      });
    });

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/courses/[id] - Delete a course
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const courseId = parseInt(params.id);
    if (isNaN(courseId)) {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    }

    // Check if the course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Delete the course (cascading delete will handle related entities)
    await prisma.course.delete({
      where: { id: courseId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
}
