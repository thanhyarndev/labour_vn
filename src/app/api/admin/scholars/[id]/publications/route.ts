import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Publication } from '@/models/Publication';
import { Scholar } from '@/models/Scholar';
import mongoose from 'mongoose';

// GET /api/admin/scholars/[id]/publications - Get publications for a scholar
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid scholar ID' },
        { status: 400 }
      );
    }
    
    // Check if scholar exists
    const scholar = await Scholar.findById(id);
    if (!scholar) {
      return NextResponse.json(
        { success: false, error: 'Scholar not found' },
        { status: 404 }
      );
    }
    
    // Get publications for this scholar
    const publications = await Publication.find({ scholarId: id })
      .populate('keywordIds', 'name displayName slug')
      .sort({ year: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: publications
    });
  } catch (error: any) {
    console.error('Error fetching scholar publications:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/admin/scholars/[id]/publications - Link publication to scholar
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    const body = await request.json();
    const { publicationId } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid scholar ID' },
        { status: 400 }
      );
    }

    if (!publicationId || !mongoose.Types.ObjectId.isValid(publicationId)) {
      return NextResponse.json(
        { success: false, error: 'Valid publication ID is required' },
        { status: 400 }
      );
    }

    // Check if scholar exists
    const scholar = await Scholar.findById(id);
    if (!scholar) {
      return NextResponse.json(
        { success: false, error: 'Scholar not found' },
        { status: 404 }
      );
    }

    // Check if publication exists
    const publication = await Publication.findById(publicationId);
    if (!publication) {
      return NextResponse.json(
        { success: false, error: 'Publication not found' },
        { status: 404 }
      );
    }

    // Update publication to link to scholar
    await Publication.findByIdAndUpdate(publicationId, { scholarId: id });

    // Update scholar's publication count
    const publicationCount = await Publication.countDocuments({ scholarId: id });
    const relatedPublicationCount = await Publication.countDocuments({ 
      scholarId: id, 
      isVietnamLaborRelated: true 
    });
    
    await Scholar.findByIdAndUpdate(id, {
      publicationCount,
      relatedPublicationCount
    });

    return NextResponse.json({
      success: true,
      message: 'Publication linked to scholar successfully'
    });
  } catch (error: any) {
    console.error('Error linking publication to scholar:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/scholars/[id]/publications/[publicationId] - Unlink publication from scholar
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    const { publicationId } = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(publicationId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid scholar or publication ID' },
        { status: 400 }
      );
    }

    // Check if scholar exists
    const scholar = await Scholar.findById(id);
    if (!scholar) {
      return NextResponse.json(
        { success: false, error: 'Scholar not found' },
        { status: 404 }
      );
    }

    // Check if publication exists and is linked to this scholar
    const publication = await Publication.findOne({ 
      _id: publicationId, 
      scholarId: id 
    });
    
    if (!publication) {
      return NextResponse.json(
        { success: false, error: 'Publication not found or not linked to this scholar' },
        { status: 404 }
      );
    }

    // Unlink publication from scholar
    await Publication.findByIdAndUpdate(publicationId, { $unset: { scholarId: 1 } });

    // Update scholar's publication count
    const publicationCount = await Publication.countDocuments({ scholarId: id });
    const relatedPublicationCount = await Publication.countDocuments({ 
      scholarId: id, 
      isVietnamLaborRelated: true 
    });
    
    await Scholar.findByIdAndUpdate(id, {
      publicationCount,
      relatedPublicationCount
    });

    return NextResponse.json({
      success: true,
      message: 'Publication unlinked from scholar successfully'
    });
  } catch (error: any) {
    console.error('Error unlinking publication from scholar:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
