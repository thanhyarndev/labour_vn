import { NextRequest, NextResponse } from "next/server";
import { CreateKeywordInput, Keyword } from "@/models";
import { connectToDatabase } from "@/lib/db";
import { generateSlug } from "@/utils/slugGenerator";

// GET /api/admin/keywords
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const isApproved = searchParams.get('isApproved');

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
      query.isApproved = isApproved === 'true';
    }

    // Get total count for pagination
    const total = await Keyword.countDocuments(query);

    // Get paginated results
    const keywords = await Keyword.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: keywords,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching keywords:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch keywords' },
      { status: 500 }
    );
  }
}

// POST /api/admin/keywords
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body: CreateKeywordInput = await request.json();

    // Validate required fields
    if (!body.name || !body.displayName) {
      return NextResponse.json(
        { success: false, error: 'Name and display name are required' },
        { status: 400 }
      );
    }

    // Use provided slug or generate from displayName/name
    let slug = body.slug || generateSlug(body.displayName || body.name);

    // Check if slug already exists
    const existingKeyword = await Keyword.findOne({ slug });
    if (existingKeyword) {
      // Add a number suffix if slug exists
      let newSlug = slug;
      let counter = 1;
      while (await Keyword.findOne({ slug: newSlug })) {
        newSlug = `${slug}-${counter}`;
        counter++;
      }
      slug = newSlug;
    }

    // Check if name already exists
    const existingName = await Keyword.findOne({ name: body.name });
    if (existingName) {
      return NextResponse.json(
        { success: false, error: 'A keyword with this name already exists' },
        { status: 400 }
      );
    }

    // Create new keyword
    const newKeyword = new Keyword({
      name: body.name,
      displayName: body.displayName,
      slug: slug,
      aliases: body.aliases || [],
      description: body.description || '',
      isApproved: body.isApproved ?? true
    });

    await newKeyword.save();

    return NextResponse.json({
      success: true,
      data: newKeyword
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating keyword:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create keyword' },
      { status: 500 }
    );
  }
}