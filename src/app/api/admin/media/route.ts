import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { MediaType } from '@prisma/client';
import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';
import { ENV } from '@/lib/env';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const mediaType = searchParams.get('mediaType') as MediaType | null;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where = mediaType ? { mediaType } : {};

    const [mediaAssets, total] = await Promise.all([
      prisma.mediaAsset.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
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
      }),
      prisma.mediaAsset.count({ where }),
    ]);

    return NextResponse.json({
      mediaAssets,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching media assets:', error);
    return NextResponse.json({ error: 'Failed to fetch media assets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Log session information for debugging
    console.log('Session in media API:', session ? 'Session exists' : 'No session');
    console.log('User role:', session?.user?.role || 'No role');
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const altText = formData.get('altText') as string;
    const mediaType = formData.get('mediaType') as MediaType;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Determine media type from file if not provided
    let determinedMediaType = mediaType;
    if (!determinedMediaType) {
      const mimeType = file.type;
      if (mimeType.startsWith('image/')) {
        determinedMediaType = 'IMAGE';
      } else if (mimeType.startsWith('video/')) {
        determinedMediaType = 'VIDEO';
      } else if (mimeType.startsWith('audio/')) {
        determinedMediaType = 'AUDIO';
      } else {
        determinedMediaType = 'DOCUMENT';
      }
    }

    // Generate a unique filename
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;
    const folderPath = `media/${determinedMediaType.toLowerCase()}`;
    const storagePath = `${folderPath}/${uniqueFileName}`;

    // Upload file to blob storage
    const blob = await put(storagePath, file, {
      access: 'public',
      token: ENV.BLOB_READ_WRITE_TOKEN,
    });

    // Get image dimensions if it's an image
    let width, height;
    if (determinedMediaType === 'IMAGE' && typeof createImageBitmap === 'function') {
      try {
        const buffer = await file.arrayBuffer();
        const bitmap = await createImageBitmap(new Blob([buffer]));
        width = bitmap.width;
        height = bitmap.height;
        bitmap.close();
      } catch (error) {
        console.error('Error getting image dimensions:', error);
      }
    }

    // Convert user ID from string to integer
    const uploadedById = parseInt(session.user.id, 10);
    
    if (isNaN(uploadedById)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Create media asset record in database
    const mediaAsset = await prisma.mediaAsset.create({
      data: {
        fileName: uniqueFileName,
        originalFileName: file.name,
        fileSize: file.size,
        mediaType: determinedMediaType,
        mimeType: file.type,
        storagePath: blob.pathname,
        publicUrl: blob.url,
        title,
        description,
        altText,
        width,
        height,
        uploadedById, // Now using the parsed integer
      },
    });

    return NextResponse.json({ mediaAsset });
  } catch (error) {
    console.error('Error uploading media asset:', error);
    return NextResponse.json({ error: 'Failed to upload media asset' }, { status: 500 });
  }
}
