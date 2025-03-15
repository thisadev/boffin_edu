import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { del } from '@vercel/blob';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const mediaAsset = await prisma.mediaAsset.findUnique({
      where: { id },
      include: {
        uploadedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        placeholders: {
          include: {
            placeholder: true,
          },
        },
      },
    });

    if (!mediaAsset) {
      return NextResponse.json({ error: 'Media asset not found' }, { status: 404 });
    }

    return NextResponse.json({ mediaAsset });
  } catch (error) {
    console.error('Error fetching media asset:', error);
    return NextResponse.json({ error: 'Failed to fetch media asset' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { title, description, altText } = await request.json();

    const mediaAsset = await prisma.mediaAsset.findUnique({
      where: { id },
    });

    if (!mediaAsset) {
      return NextResponse.json({ error: 'Media asset not found' }, { status: 404 });
    }

    const updatedMediaAsset = await prisma.mediaAsset.update({
      where: { id },
      data: {
        title,
        description,
        altText,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ mediaAsset: updatedMediaAsset });
  } catch (error) {
    console.error('Error updating media asset:', error);
    return NextResponse.json({ error: 'Failed to update media asset' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const mediaAsset = await prisma.mediaAsset.findUnique({
      where: { id },
    });

    if (!mediaAsset) {
      return NextResponse.json({ error: 'Media asset not found' }, { status: 404 });
    }

    // Delete from blob storage
    await del(mediaAsset.storagePath);

    // Delete from database
    await prisma.mediaAsset.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Media asset deleted successfully' });
  } catch (error) {
    console.error('Error deleting media asset:', error);
    return NextResponse.json({ error: 'Failed to delete media asset' }, { status: 500 });
  }
}
