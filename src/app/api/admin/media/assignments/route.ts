import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { placeholderId, mediaAssetId, isActive = true, orderIndex = 0 } = await request.json();

    if (!placeholderId || !mediaAssetId) {
      return NextResponse.json({ error: 'Placeholder ID and media asset ID are required' }, { status: 400 });
    }

    // Check if the placeholder and media asset exist
    const [placeholder, mediaAsset] = await Promise.all([
      prisma.mediaPlaceholder.findUnique({ where: { id: placeholderId } }),
      prisma.mediaAsset.findUnique({ where: { id: mediaAssetId } }),
    ]);

    if (!placeholder) {
      return NextResponse.json({ error: 'Placeholder not found' }, { status: 404 });
    }

    if (!mediaAsset) {
      return NextResponse.json({ error: 'Media asset not found' }, { status: 404 });
    }

    // Check if the assignment already exists
    const existingAssignment = await prisma.mediaPlaceholderAssignment.findUnique({
      where: {
        placeholderId_mediaAssetId: {
          placeholderId,
          mediaAssetId,
        },
      },
    });

    if (existingAssignment) {
      // Update the existing assignment
      const updatedAssignment = await prisma.mediaPlaceholderAssignment.update({
        where: {
          placeholderId_mediaAssetId: {
            placeholderId,
            mediaAssetId,
          },
        },
        data: {
          isActive,
          orderIndex,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({ assignment: updatedAssignment });
    }

    // Create a new assignment
    const assignment = await prisma.mediaPlaceholderAssignment.create({
      data: {
        placeholderId,
        mediaAssetId,
        isActive,
        orderIndex,
      },
    });

    return NextResponse.json({ assignment });
  } catch (error) {
    console.error('Error creating media assignment:', error);
    return NextResponse.json({ error: 'Failed to create media assignment' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const placeholderId = parseInt(searchParams.get('placeholderId') || '');
    const mediaAssetId = searchParams.get('mediaAssetId');

    if (isNaN(placeholderId) || !mediaAssetId) {
      return NextResponse.json({ error: 'Valid placeholder ID and media asset ID are required' }, { status: 400 });
    }

    // Check if the assignment exists
    const existingAssignment = await prisma.mediaPlaceholderAssignment.findUnique({
      where: {
        placeholderId_mediaAssetId: {
          placeholderId,
          mediaAssetId,
        },
      },
    });

    if (!existingAssignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }

    // Delete the assignment
    await prisma.mediaPlaceholderAssignment.delete({
      where: {
        placeholderId_mediaAssetId: {
          placeholderId,
          mediaAssetId,
        },
      },
    });

    return NextResponse.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error('Error deleting media assignment:', error);
    return NextResponse.json({ error: 'Failed to delete media assignment' }, { status: 500 });
  }
}
