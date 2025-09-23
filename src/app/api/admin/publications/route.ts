import { NextRequest, NextResponse } from 'next/server';
import { Publication, CreatePublicationInput } from '@/models';
import { connectToDatabase } from '@/lib/db';

// GET /api/admin/publications - Get all publications
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const scholarId = searchParams.get('scholarId');

    // Build query
    const query: Record<string, unknown> = {};
    
    // Filter by scholar if provided
    if (scholarId) {
      query.scholarIds = scholarId;
    }

    // Filter by search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { authors: { $in: [new RegExp(search, 'i')] } },
        { citationDetail: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by year
    const year = searchParams.get('year');
    if (year) {
      query.year = parseInt(year);
    }

    // Filter by type
    const type = searchParams.get('type');
    if (type) {
      query.type = type;
    }

    // Filter by isVietnamLabourRelated
    const isVietnamLabourRelated = searchParams.get('isVietnamLabourRelated');
    if (isVietnamLabourRelated === 'true') {
      query.isVietnamLabourRelated = true;
    } else if (isVietnamLabourRelated === 'false') {
      query.isVietnamLabourRelated = false;
    }

    // Get total count for pagination
    const total = await Publication.countDocuments(query);

    // Get paginated results
    const publications = await Publication.find(query)
      .populate('scholarIds', 'fullName slug')
      .populate('keywordIds', 'name displayName slug')
      .sort({ year: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      ok: true,
      data: publications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching publications:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch publications' },
      { status: 500 }
    );
  }
}

// POST /api/admin/publications - Create new publication
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body: CreatePublicationInput = await request.json();
    
    // Validation
    if (!body.title || !body.authors || body.authors.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Title and authors are required' },
        { status: 400 }
      );
    }

    // Create publication document
    const publicationData = {
      title: body.title,
      authors: body.authors,
      year: body.year || new Date().getFullYear(),
      citationDetail: body.citationDetail || '',
      type: body.publicationType === 'journal-article' ? 'article' : (body.publicationType || 'article'),
      abstract: body.abstract || '',
      quote: body.quote || '',
      doi: body.doi && body.doi.trim() !== '' ? body.doi : undefined,
      url: body.url && body.url.trim() !== '' ? body.url : undefined,
      citations: body.citationCount || 0,
      isVietnamLabourRelated: body.isVietnamLabourRelated ?? true,
      scholarIds: [], // Will be linked when scholar is created
      keywordIds: [], // Will be linked when keywords are available
      tags: []
    };
    
    const newPublication = new Publication(publicationData);

    const savedPublication = await newPublication.save();

    return NextResponse.json({
      success: true,
      data: savedPublication
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating publication:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to create publication' },
      { status: 500 }
    );
  }
}