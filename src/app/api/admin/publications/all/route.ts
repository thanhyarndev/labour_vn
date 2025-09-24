import { NextRequest, NextResponse } from 'next/server';
import { Publication } from '@/models';
import { connectToDatabase } from '@/lib/db';

// GET /api/admin/publications/all - Get all publications without pagination
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
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

    // Get all publications without pagination
    const publications = await Publication.find(query)
      .populate('scholarIds', 'fullName slug')
      .populate('keywordIds', 'name displayName slug')
      .sort({ year: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      ok: true,
      data: publications,
      total: publications.length
    });
  } catch (error) {
    console.error('Error fetching all publications:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch publications' },
      { status: 500 }
    );
  }
}
