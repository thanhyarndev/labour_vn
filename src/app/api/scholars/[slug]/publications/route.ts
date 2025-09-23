import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Scholar } from "@/models/Scholar";
import { Publication } from "@/models/Publication";

// GET /api/scholars/[slug]/publications - Lấy publications của một scholar
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
    const year = searchParams.get('year');
    const type = searchParams.get('type');
    const isVietnamLabourRelated = searchParams.get('isVietnamLabourRelated');
    const sortBy = searchParams.get('sortBy') || 'year'; // year, title, citations
    
    // Tìm scholar theo slug
    const scholar = await Scholar.findOne({ 
      slug: slug,
      status: 'active'
    }).populate('keywordIds', 'name displayName slug');
    
    if (!scholar) {
      return NextResponse.json({
        ok: true,
        scholar: null,
        publications: [],
        pagination: {
          page,
          limit,
          total: 0,
          pages: 0
        }
      });
    }
    
    // Tìm publications của scholar
    const query: any = {
      scholarId: scholar._id
    };
    
    if (year) {
      query.year = parseInt(year);
    }
    
    if (type) {
      query.type = type;
    }
    
    if (isVietnamLabourRelated !== null) {
      query.isVietnamLabourRelated = isVietnamLabourRelated === 'true';
    }
    
    const skip = (page - 1) * limit;
    
    // Sắp xếp
    let sort: any = { year: -1, createdAt: -1 };
    if (sortBy === 'year') {
      sort = { year: -1, createdAt: -1 };
    } else if (sortBy === 'title') {
      sort = { title: 1 };
    } else if (sortBy === 'citations') {
      sort = { citations: -1, year: -1 };
    }
    
    const [publications, total] = await Promise.all([
      Publication.find(query)
        .populate('keywordIds', 'name displayName slug')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Publication.countDocuments(query)
    ]);
    
    return NextResponse.json({
      ok: true,
      scholar: {
        _id: scholar._id,
        fullName: scholar.fullName,
        affiliation: scholar.affiliation,
        slug: scholar.slug,
        bio: scholar.bio,
        avatarUrl: scholar.avatarUrl,
        keywordIds: scholar.keywordIds,
        publicationCount: scholar.publicationCount,
        relatedPublicationCount: scholar.relatedPublicationCount,
        frequentContributor: scholar.frequentContributor
      },
      publications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching scholar publications:', error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}
