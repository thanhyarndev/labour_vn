import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Keyword } from "@/models/Keyword";
import { Scholar } from "@/models/Scholar";

// GET /api/keywords/[slug]/scholars - Tìm scholars theo keyword slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sortBy = searchParams.get('sortBy') || 'relevance'; // relevance, name, publications
    
    // Tìm keyword theo slug
    const keyword = await Keyword.findOne({ 
      slug: slug,
      isApproved: true 
    });
    
    if (!keyword) {
      return NextResponse.json({
        ok: true,
        keyword: null,
        scholars: [],
        pagination: {
          page,
          limit,
          total: 0,
          pages: 0
        }
      });
    }
    
    // Tìm scholars có keyword này
    const query = {
      keywordIds: keyword._id,
      status: 'active'
    };
    
    const skip = (page - 1) * limit;
    
    // Sắp xếp theo độ liên quan
    let sort: any = { createdAt: -1 };
    if (sortBy === 'relevance') {
      sort = { 
        relatedPublicationCount: -1, 
        publicationCount: -1, 
        createdAt: -1 
      };
    } else if (sortBy === 'name') {
      sort = { fullName: 1 };
    } else if (sortBy === 'publications') {
      sort = { publicationCount: -1, createdAt: -1 };
    }
    
    const [scholars, total] = await Promise.all([
      Scholar.find(query)
        .populate('keywordIds', 'name displayName slug')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Scholar.countDocuments(query)
    ]);
    
    return NextResponse.json({
      ok: true,
      keyword: {
        _id: keyword._id,
        name: keyword.name,
        displayName: keyword.displayName,
        slug: keyword.slug,
        description: keyword.description
      },
      scholars,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error searching scholars by keyword:', error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}
