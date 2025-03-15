import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PlaceholderType } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const placeholderType = searchParams.get('placeholderType') as PlaceholderType | null;
    const context = searchParams.get('context');
    const contextId = searchParams.get('contextId');

    const where: any = {};
    if (placeholderType) where.placeholderType = placeholderType;
    if (context) where.context = context;
    if (contextId) where.contextId = contextId;

    const placeholders = await prisma.mediaPlaceholder.findMany({
      where,
      include: {
        mediaAssets: {
          include: {
            mediaAsset: true,
          },
          orderBy: {
            orderIndex: 'asc',
          },
          where: {
            isActive: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ placeholders });
  } catch (error) {
    console.error('Error fetching placeholders:', error);
    return NextResponse.json({ error: 'Failed to fetch placeholders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description, placeholderType, context, contextId } = await request.json();

    if (!name || !placeholderType) {
      return NextResponse.json({ error: 'Name and placeholder type are required' }, { status: 400 });
    }

    const placeholder = await prisma.mediaPlaceholder.create({
      data: {
        name,
        description,
        placeholderType,
        context,
        contextId,
      },
    });

    return NextResponse.json({ placeholder });
  } catch (error) {
    console.error('Error creating placeholder:', error);
    return NextResponse.json({ error: 'Failed to create placeholder' }, { status: 500 });
  }
}
