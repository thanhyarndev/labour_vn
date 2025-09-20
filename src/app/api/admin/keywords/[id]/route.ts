import { NextRequest, NextResponse } from "next/server";
import { Keyword, UpdateKeywordInput } from "@/models";
import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";

// GET /api/admin/keywords/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid keyword ID' },
        { status: 400 }
      );
    }
    
    const keyword = await Keyword.findById(id).lean();
    
    if (!keyword) {
      return NextResponse.json(
        { success: false, error: 'Keyword not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: keyword
    });
  } catch (error) {
    console.error('Error fetching keyword:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch keyword' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/keywords/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    const body: UpdateKeywordInput = await request.json();
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid keyword ID' },
        { status: 400 }
      );
    }
    
    // Check if keyword exists
    const existingKeyword = await Keyword.findById(id);
    if (!existingKeyword) {
      return NextResponse.json(
        { success: false, error: 'Keyword not found' },
        { status: 404 }
      );
    }

    // Check if name is being updated and if it conflicts
    if (body.name && body.name !== existingKeyword.name) {
      const nameExists = await Keyword.findOne({ 
        name: body.name, 
        _id: { $ne: id } 
      });
      if (nameExists) {
        return NextResponse.json(
          { success: false, error: 'A keyword with this name already exists' },
          { status: 400 }
        );
      }
    }

    // Update keyword
    const updatedKeyword = await Keyword.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedKeyword
    });
  } catch (error) {
    console.error('Error updating keyword:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update keyword' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/keywords/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid keyword ID' },
        { status: 400 }
      );
    }
    
    // Check if keyword exists
    const existingKeyword = await Keyword.findById(id);
    if (!existingKeyword) {
      return NextResponse.json(
        { success: false, error: 'Keyword not found' },
        { status: 404 }
      );
    }

    // Delete keyword
    await Keyword.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Keyword deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting keyword:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete keyword' },
      { status: 500 }
    );
  }
}