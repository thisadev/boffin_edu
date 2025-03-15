import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/categories/[id] - Get a specific category
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
    }

    const category = await prisma.courseCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            courses: true
          }
        }
      }
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // Format the response
    const formattedCategory = {
      ...category,
      courseCount: category._count.courses,
      _count: undefined
    };

    return NextResponse.json(formattedCategory);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/categories/[id] - Update a category
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    // Check if the category exists
    const existingCategory = await prisma.courseCategory.findUnique({
      where: { id }
    });

    if (!existingCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // Check if another category with the same name or slug exists (excluding this one)
    if (data.name !== existingCategory.name || (data.slug && data.slug !== existingCategory.slug)) {
      const duplicateCategory = await prisma.courseCategory.findFirst({
        where: {
          OR: [
            { name: data.name },
            { slug: data.slug || existingCategory.slug },
          ],
          NOT: {
            id
          }
        },
      });

      if (duplicateCategory) {
        return NextResponse.json(
          { error: "Another category with this name or slug already exists" },
          { status: 400 }
        );
      }
    }

    // Generate slug from name if not provided
    if (!data.slug) {
      data.slug = data.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    // Update the category
    const updatedCategory = await prisma.courseCategory.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description !== undefined ? data.description : existingCategory.description,
        imageUrl: data.imageUrl !== undefined ? data.imageUrl : existingCategory.imageUrl,
        isActive: data.isActive !== undefined ? data.isActive : existingCategory.isActive,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/categories/[id] - Delete a category
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
    }

    // Check if the category exists
    const category = await prisma.courseCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            courses: true
          }
        }
      }
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // Check if the category has courses
    if (category._count.courses > 0) {
      return NextResponse.json(
        { error: "Cannot delete a category that has courses. Please reassign or delete the courses first." },
        { status: 400 }
      );
    }

    // Delete the category
    await prisma.courseCategory.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
