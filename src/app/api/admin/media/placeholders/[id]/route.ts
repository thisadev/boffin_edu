import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const placeholderId = parseInt(id);

    if (isNaN(placeholderId)) {
      return NextResponse.json({ error: 'Invalid placeholder ID' }, { status: 400 });
    }

    const placeholder = await prisma.mediaPlaceholder.findUnique({
      where: { id: placeholderId },
      include: {
        mediaAssets: {
          include: {
            mediaAsset: true,
          },
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });

    if (!placeholder) {
      return NextResponse.json({ error: 'Placeholder not found' }, { status: 404 });
    }

    return NextResponse.json({ placeholder });
  } catch (error) {
    console.error('Error fetching placeholder:', error);
    return NextResponse.json({ error: 'Failed to fetch placeholder' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const placeholderId = parseInt(id);

    if (isNaN(placeholderId)) {
      return NextResponse.json({ error: 'Invalid placeholder ID' }, { status: 400 });
    }

    const { name, description, placeholderType, context, contextId } = await request.json();

    const placeholder = await prisma.mediaPlaceholder.findUnique({
      where: { id: placeholderId },
    });

    if (!placeholder) {
      return NextResponse.json({ error: 'Placeholder not found' }, { status: 404 });
    }

    const updatedPlaceholder = await prisma.mediaPlaceholder.update({
      where: { id: placeholderId },
      data: {
        name,
        description,
        placeholderType,
        context,
        contextId,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ placeholder: updatedPlaceholder });
  } catch (error) {
    console.error('Error updating placeholder:', error);
    return NextResponse.json({ error: 'Failed to update placeholder' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const placeholderId = parseInt(id);

    if (isNaN(placeholderId)) {
      return NextResponse.json({ error: 'Invalid placeholder ID' }, { status: 400 });
    }

    const placeholder = await prisma.mediaPlaceholder.findUnique({
      where: { id: placeholderId },
    });

    if (!placeholder) {
      return NextResponse.json({ error: 'Placeholder not found' }, { status: 404 });
    }

    // Delete the placeholder (cascade will delete assignments)
    await prisma.mediaPlaceholder.delete({
      where: { id: placeholderId },
    });

    return NextResponse.json({ message: 'Placeholder deleted successfully' });
  } catch (error) {
    console.error('Error deleting placeholder:', error);
    return NextResponse.json({ error: 'Failed to delete placeholder' }, { status: 500 });
  }
}
