import { NextRequest, NextResponse } from "next/server";
import { Keyword } from "@/models";
import { connectToDatabase } from "@/lib/db";

// GET /api/admin/keywords/all - Get all approved keywords for admin use
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const isApproved = searchParams.get('isApproved') !== 'false'; // Default to true

    // Build query
    const query: Record<string, unknown> = {};
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { displayName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { aliases: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Approval status filter
    if (isApproved !== null) {
      query.isApproved = isApproved;
    }

    // Get all keywords (no pagination for admin use)
    const keywords = await Keyword.find(query)
      .sort({ displayName: 1 }) // Sort alphabetically for better UX
      .lean();

    return NextResponse.json({
      success: true,
      data: keywords,
      total: keywords.length
    });
  } catch (error) {
    console.error('Error fetching all keywords:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch keywords' },
      { status: 500 }
    );
  }
}
