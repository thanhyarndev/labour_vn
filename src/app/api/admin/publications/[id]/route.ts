import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Publication } from '@/models/Publication';
import mongoose from 'mongoose';

// GET /api/admin/publications/[id] - Get publication by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid publication ID' },
        { status: 400 }
      );
    }
    
    const publication = await Publication.findById(id).lean();

    if (!publication) {
      return NextResponse.json(
        { success: false, error: 'Publication not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: publication
    });
  } catch (error: unknown) {
    console.error('Error fetching publication:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch publication' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/publications/[id] - Update publication
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    const body = await request.json();
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid publication ID' },
        { status: 400 }
      );
    }
    
    const publication = await Publication.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!publication) {
      return NextResponse.json(
        { success: false, error: 'Publication not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: publication
    });
  } catch (error: unknown) {
    console.error('Error updating publication:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to update publication' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/publications/[id] - Delete publication
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid publication ID' },
        { status: 400 }
      );
    }
    
    const publication = await Publication.findByIdAndDelete(id);
    
    if (!publication) {
      return NextResponse.json(
        { success: false, error: 'Publication not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Publication deleted successfully'
    });
  } catch (error: unknown) {
    console.error('Error deleting publication:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to delete publication' },
      { status: 500 }
    );
  }
}