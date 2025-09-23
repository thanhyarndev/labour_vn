import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Scholar } from "@/models/Scholar";
import { Keyword } from "@/models/Keyword";

// GET /api/search - Search scholars by query
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    if (!query.trim()) {
      return NextResponse.json({
        success: true,
        data: [],
        pagination: {
          page,
          limit,
          total: 0,
          pages: 0
        }
      });
    }
    
    const skip = (page - 1) * limit;
    
    // Only search by keywords - find keywords that match the query
    const matchingKeywords = await Keyword.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { displayName: { $regex: query, $options: 'i' } },
        { aliases: { $in: [new RegExp(query, 'i')] } }
      ],
      isApproved: true
    });
    
    // If no matching keywords found, return empty results
    if (matchingKeywords.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        pagination: {
          page,
          limit,
          total: 0,
          pages: 0
        }
      });
    }
    
    // Build search query for scholars - only search by keyword IDs
    const keywordIds = matchingKeywords.map(k => k._id);
    const scholarQuery: any = {
      status: 'active',
      keywordIds: { $in: keywordIds }
    };
    
    const [scholars, total] = await Promise.all([
      Scholar.find(scholarQuery)
        .populate('keywordIds', 'name displayName slug')
        .populate('publicationIds', 'title authors year citationDetail type abstract doi url isVietnamLabourRelated')
        .sort({ 
          frequentContributor: -1, 
          publicationCount: -1, 
          createdAt: -1 
        })
        .skip(skip)
        .limit(limit)
        .lean(),
      Scholar.countDocuments(scholarQuery)
    ]);
    
    return NextResponse.json({
      success: true,
      data: scholars,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error: any) {
    console.error('Error searching scholars:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
