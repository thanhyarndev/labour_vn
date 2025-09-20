import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Scholar } from "@/models/Scholar";

// GET /api/occasional-contributors - Get all occasional contributors
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'name'; // name, publications, affiliation
    
    // Build query for occasional contributors (frequentContributor = false)
    const query: any = {
      status: 'active',
      frequentContributor: false
    };
    
    // Add search filter
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { normalizedName: { $regex: search, $options: 'i' } },
        { affiliation: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } },
        { researchInterests: { $regex: search, $options: 'i' } },
        { expertiseAreas: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (page - 1) * limit;
    
    // Build sort object
    let sort: any = { createdAt: -1 };
    if (sortBy === 'name') {
      sort = { fullName: 1 };
    } else if (sortBy === 'publications') {
      sort = { publicationCount: -1, createdAt: -1 };
    } else if (sortBy === 'affiliation') {
      sort = { affiliation: 1, fullName: 1 };
    }
    
    const [scholars, total] = await Promise.all([
      Scholar.find(query)
        .populate('keywordIds', 'name displayName slug')
        .populate('publicationIds', 'title authors year venue type abstract doi url isVietnamLaborRelated')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Scholar.countDocuments(query)
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
    console.error('Error fetching occasional contributors:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
