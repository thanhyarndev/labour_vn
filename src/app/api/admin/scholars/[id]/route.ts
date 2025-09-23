import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Scholar } from "@/models/Scholar";
import { Keyword } from "@/models/Keyword";
import { Publication } from "@/models/Publication";
import { ScholarCreateInput } from "@/utils/validators";
import mongoose from "mongoose";

// GET /api/admin/scholars/[id] - Lấy scholar theo ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid scholar ID' },
        { status: 400 }
      );
    }
    
    const scholar = await Scholar.findById(id)
      .populate('keywordIds', 'name displayName slug')
      .populate('publicationIds', 'title authors year citationDetail type abstract doi url isVietnamLabourRelated')
      .lean();
    
    if (!scholar) {
      return NextResponse.json(
        { ok: false, error: 'Scholar not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      ok: true,
      data: scholar
    });
  } catch (error: any) {
    console.error('Error fetching scholar:', error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/admin/scholars/[id] - Cập nhật scholar
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid scholar ID' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // Transform form data to expected format (same as POST)
    const transformedBody = {
      fullName: body.fullName || `${body.firstName || ''} ${body.middleName || ''} ${body.lastName || ''}`.trim(),
      familyName: body.familyName || body.lastName,
      givenName: body.givenName || `${body.firstName || ''} ${body.middleName || ''}`.trim(),
      normalizedName: body.normalizedName || `${body.firstName || ''} ${body.middleName || ''} ${body.lastName || ''}`.toLowerCase().trim(),
      slug: body.slug,
      title: body.title,
      affiliation: body.affiliation || body.institution,
      department: body.department,
      position: body.position,
      email: body.email,
      phone: body.phone && body.phone.trim() !== '' ? body.phone : undefined,
      homepageUrl: body.homepageUrl || (body.website && body.website.startsWith('http') ? body.website : undefined),
      scholarUrl: body.scholarUrl || (body.googleScholarUrl && body.googleScholarUrl.startsWith('http') ? body.googleScholarUrl : undefined),
      institutionalProfileUrl: body.institutionalProfileUrl && body.institutionalProfileUrl.trim() !== '' && body.institutionalProfileUrl.startsWith('http') ? body.institutionalProfileUrl : undefined,
      orcid: body.orcid || body.orcidId,
      bio: body.bio,
      researchInterests: body.researchInterests,
      expertiseAreas: body.expertiseAreas,
      avatarUrl: body.avatarUrl && body.avatarUrl.startsWith('http') ? body.avatarUrl : undefined,
      keywordSlugs: body.keywordSlugs || [],
      newKeywords: body.newKeywords || [],
      publications: (body.publications || []).map((pub: any) => ({
        ...pub,
        year: pub.year ? parseInt(pub.year) : undefined,
        type: pub.type && ["article", "book", "chapter", "conference", "report", "thesis", "other", "journal-article"].includes(pub.type) 
          ? pub.type 
          : "article",
        url: pub.url && pub.url.trim() !== '' && pub.url.startsWith('http') ? pub.url : undefined
      })),
      status: body.status || "active"
    };
    
    const input = ScholarCreateInput.parse(transformedBody);
    
    // Handle keywords update
    const allKeywords = [];
    if (input.keywordSlugs.length) {
      const existing = await Keyword.find({ slug: { $in: input.keywordSlugs } });
      allKeywords.push(...existing);
    }
    
    // Handle keywordIds from payload (if provided)
    if (body.keywordIds && body.keywordIds.length > 0) {
      const existingByIds = await Keyword.find({ _id: { $in: body.keywordIds } });
      allKeywords.push(...existingByIds);
    }
    
    // Handle new keywords creation
    if (input.newKeywords && input.newKeywords.length > 0) {
      const createdKeywords = await Keyword.insertMany(input.newKeywords);
      allKeywords.push(...createdKeywords);
    }
    
    const keywordIds = allKeywords.map(k => k._id);
    const keywordNames = allKeywords.map(k => k.name);
    
    // Handle publications update
    const publicationIds = [];
    let publicationCount = 0;
    let relatedPublicationCount = 0;
    const allPublications = [];
    
    // Handle publications from UI (existing publications that are being updated)
    if (input.publications && input.publications.length > 0) {
      console.log('Processing publications from UI:', input.publications.length);
      
      // Create or update publications
      const publicationPromises = input.publications.map(async (pub: any) => {
        // Map journal-article to article for database storage
        const pubType = pub.type === "journal-article" ? "article" : (pub.type || "article");
        
        const pubData = {
          title: pub.title,
          year: pub.year ? parseInt(pub.year) : undefined,
          citationDetail: pub.citationDetail,
          type: pubType,
          authors: pub.authors || [],
          abstract: pub.abstract,
          quote: pub.quote || '',
          doi: pub.doi && pub.doi.trim() !== '' ? pub.doi : undefined,
          url: pub.url && pub.url.trim() !== '' ? pub.url : undefined,
          keywordIds: [], // Will be handled separately if needed
          tags: pub.tags || [],
          isVietnamLabourRelated: pub.isVietnamLabourRelated ?? true,
          citations: 0,
        };
        
        // If publication has an _id, update it
        if (pub._id) {
          const updatedPub = await Publication.findByIdAndUpdate(
            pub._id,
            { ...pubData, $addToSet: { scholarIds: id } },
            { new: true }
          );
          return updatedPub;
        } else {
          // Check if publication already exists by title and authors (case-insensitive)
          const existingPub = await Publication.findOne({
            title: { $regex: new RegExp(`^${pubData.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
            authors: { $all: pubData.authors, $size: pubData.authors.length }
          });
          
          if (existingPub) {
            // Link existing publication to scholar
            const updatedPub = await Publication.findByIdAndUpdate(
              existingPub._id,
              { 
                ...pubData, // Update with new data
                $addToSet: { scholarIds: id } 
              },
              { new: true }
            );
            return updatedPub;
          } else {
            // Create new publication only if it doesn't exist
            const newPub = await Publication.create({
              ...pubData,
              scholarIds: [id]
            });
            return newPub;
          }
        }
      });
      
      const processedPublications = await Promise.all(publicationPromises);
      allPublications.push(...processedPublications);
      publicationIds.push(...processedPublications.map(pub => pub._id));
      
      console.log('Processed publications:', processedPublications.length);
    }
    
    // Handle existing publications by ID (for linking)
    if (body.publicationIds && body.publicationIds.length > 0) {
      console.log('Linking existing publications by ID:', body.publicationIds.length);
      
      // Get publication details to calculate counts
      const existingPublications = await Publication.find({ 
        _id: { $in: body.publicationIds } 
      });
      
      // Add to arrays if not already included
      for (const pub of existingPublications) {
        if (!publicationIds.includes(pub._id.toString())) {
          allPublications.push(pub);
          publicationIds.push(pub._id);
        }
      }
      
      // Update publications with scholar ID
      await Publication.updateMany(
        { _id: { $in: body.publicationIds } },
        { $addToSet: { scholarIds: id } }
      );
    }
    
    // Handle new publications creation
    if (input.newPublications && input.newPublications.length > 0) {
      console.log('Creating new publications:', input.newPublications.length);
      
      const newPubs = input.newPublications.map(pub => {
        // Map journal-article to article for database storage
        const pubType = pub.type === "journal-article" ? "article" : (pub.type || "article");
        
        return {
          ...pub,
          scholarIds: [id],
          year: pub.year ? (typeof pub.year === 'string' ? parseInt(pub.year) : pub.year) : undefined,
          type: pubType,
          url: pub.url && pub.url.trim() !== '' ? pub.url : undefined
        };
      });
      
      console.log('New publications to create:', newPubs);
      
      const createdPublications = await Publication.insertMany(newPubs);
      console.log('Created publications:', createdPublications.length);
      
      // Add new publications to arrays
      allPublications.push(...createdPublications);
      publicationIds.push(...createdPublications.map(pub => pub._id));
      
      console.log('Final publicationIds:', publicationIds);
      console.log('Total publications:', allPublications.length);
    }
    
    // Remove duplicates from allPublications array (keep only unique publications)
    const uniquePublications = [];
    const seenIds = new Set();
    
    for (const pub of allPublications) {
      if (!seenIds.has(pub._id.toString())) {
        uniquePublications.push(pub);
        seenIds.add(pub._id.toString());
      }
    }
    
    // Update publicationIds to only include unique publications
    const uniquePublicationIds = uniquePublications.map(pub => pub._id);
    
    // Remove scholar from publications that are no longer linked
    if (uniquePublicationIds.length > 0) {
      await Publication.updateMany(
        { scholarIds: id },
        { $pull: { scholarIds: id } }
      );
      
      // Re-add scholar to current publications
      await Publication.updateMany(
        { _id: { $in: uniquePublicationIds } },
        { $addToSet: { scholarIds: id } }
      );
    } else {
      // If no publications, remove scholar from all publications
      await Publication.updateMany(
        { scholarIds: id },
        { $pull: { scholarIds: id } }
      );
    }
    
    // Calculate final counts
    publicationCount = uniquePublications.length;
    // For Vietnam Labor Research Portal, all linked publications are considered related
    relatedPublicationCount = uniquePublications.filter(pub => pub.isVietnamLabourRelated !== false).length;
    const frequentContributor = relatedPublicationCount >= 3;
    
    console.log('Final counts - publicationCount:', publicationCount, 'relatedPublicationCount:', relatedPublicationCount, 'frequentContributor:', frequentContributor);
    
    const scholar = await Scholar.findByIdAndUpdate(
      id,
      {
        ...input,
        keywordIds,
        keywordNames,
        publicationIds: uniquePublicationIds,
        publicationCount,
        relatedPublicationCount,
        frequentContributor,
        normalizedName: input.normalizedName.trim().toLowerCase(),
      },
      { new: true, runValidators: true }
    ).populate('keywordIds', 'name displayName slug')
     .populate('publicationIds', 'title authors year citationDetail type abstract doi url isVietnamLabourRelated');
    
    if (!scholar) {
      return NextResponse.json(
        { ok: false, error: 'Scholar not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      ok: true,
      data: scholar
    });
  } catch (error: any) {
    console.error('Error updating scholar:', error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/scholars/[id] - Xóa scholar
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid scholar ID' },
        { status: 400 }
      );
    }
    
    const scholar = await Scholar.findByIdAndDelete(id);
    
    if (!scholar) {
      return NextResponse.json(
        { ok: false, error: 'Scholar not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      ok: true,
      message: 'Scholar deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting scholar:', error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}
