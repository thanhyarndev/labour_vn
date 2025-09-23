import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Scholar } from "@/models/Scholar";
import { Publication } from "@/models/Publication";
import { Keyword } from "@/models/Keyword";
import { ScholarCreateInput } from "@/utils/validators";
import { generateUniqueSlug } from "@/utils/slugGenerator";
import mongoose from "mongoose";

// GET /api/admin/scholars - Lấy danh sách scholars
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'active';
    const keywordSlug = searchParams.get('keywordSlug');
    const slug = searchParams.get('slug');
    
    const query: Record<string, unknown> = {};
    if (status !== 'all') {
      query.status = status;
    }
    
    // If slug is provided, find by slug
    if (slug) {
      query.slug = slug;
    } else if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { normalizedName: { $regex: search, $options: 'i' } },
        { affiliation: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (keywordSlug) {
      const keyword = await Keyword.findOne({ slug: keywordSlug });
      if (keyword) {
        query.keywordIds = keyword._id;
      }
    }
    
    const skip = (page - 1) * limit;
    
    const [scholars, total] = await Promise.all([
      Scholar.find(query)
        .populate('keywordIds', 'name displayName slug')
        .populate('publicationIds', 'title authors year citationDetail type abstract doi url isVietnamLabourRelated')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
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
  } catch (error: unknown) {
    console.error('Error fetching scholars:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/scholars - Tạo scholar mới
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    let session: mongoose.ClientSession | undefined = undefined;
    
    try {
      session = await mongoose.startSession();
      session.startTransaction();

      // Transform form data to expected format
      const fullName = body.fullName || `${body.firstName || ''} ${body.middleName || ''} ${body.lastName || ''}`.trim();
      const familyName = body.familyName || body.lastName;
      const givenName = body.givenName || `${body.firstName || ''} ${body.middleName || ''}`.trim();
      const normalizedName = body.normalizedName || fullName.toLowerCase().trim();
      
      // Generate slug if not provided
      let slug = body.slug;
      if (!slug) {
        const existingScholars = await Scholar.find({}, 'slug').lean();
        const existingSlugs = existingScholars.map(s => s.slug);
        slug = generateUniqueSlug(fullName, existingSlugs);
      }
      
      const transformedBody = {
        fullName,
        familyName,
        givenName,
        normalizedName,
        slug,
        title: body.title,
        affiliation: body.affiliation || body.institution,
        department: body.department,
        position: body.position,
        email: body.email && body.email.trim() !== '' ? body.email : undefined,
        phone: body.phone && body.phone.trim() !== '' ? body.phone : undefined,
        homepageUrl: body.homepageUrl || (body.website && body.website.trim() !== '' && body.website.startsWith('http') ? body.website : undefined),
        scholarUrl: body.scholarUrl || (body.googleScholarUrl && body.googleScholarUrl.trim() !== '' && body.googleScholarUrl.startsWith('http') ? body.googleScholarUrl : undefined),
        institutionalProfileUrl: body.institutionalProfileUrl && body.institutionalProfileUrl.trim() !== '' && body.institutionalProfileUrl.startsWith('http') ? body.institutionalProfileUrl : undefined,
        orcid: body.orcid || body.orcidId,
        bio: body.bio,
        researchInterests: body.researchInterests,
        expertiseAreas: body.expertiseAreas,
        avatarUrl: body.avatarUrl && body.avatarUrl.startsWith('http') ? body.avatarUrl : undefined,
        keywordSlugs: body.keywordSlugs || [],
        newKeywords: body.newKeywords || [],
        publicationIds: body.publicationIds || [], // Existing publications by ID
        newPublications: body.newPublications || [], // New publications to create
        // Removed legacy publications field to prevent duplicates
        status: body.status || "active"
      };
      
      console.log('transformedBody department:', transformedBody.department);
      const input = ScholarCreateInput.parse(transformedBody);
      console.log('parsed input department:', input.department);

      // 1) Handle Keywords: create new ones, find existing ones
      const allKeywords: any[] = [];
      const created: any[] = [];
      const errors: string[] = [];
      
      // 1.1) Create new keywords if provided
      if (input.newKeywords && input.newKeywords.length > 0) {
        try {
          // Check for duplicate names before creating
          const newKeywordNames = input.newKeywords.map(k => k.name);
          const existingNames = await Keyword.find({ 
            name: { $in: newKeywordNames } 
          }, { name: 1 }, { session });
          
          const existingNameSet = new Set(existingNames.map(k => k.name));
          const validNewKeywords = input.newKeywords.filter(k => !existingNameSet.has(k.name));
          const duplicateNames = input.newKeywords.filter(k => existingNameSet.has(k.name));
          
          if (duplicateNames.length > 0) {
            console.warn(`Skipping duplicate keywords: ${duplicateNames.map(k => k.name).join(', ')}`);
          }
          
          if (validNewKeywords.length > 0) {
            const newKeywordDocs = await Keyword.insertMany(validNewKeywords, { session, ordered: false });
            created.push(...newKeywordDocs);
            allKeywords.push(...newKeywordDocs);
            console.log(`Created ${validNewKeywords.length} new keywords`);
          }
        } catch (error: any) {
          console.error('Error creating new keywords:', error);
          errors.push(`Failed to create new keywords: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      // 1.2) Find existing keywords by slugs
      if (input.keywordSlugs && input.keywordSlugs.length > 0) {
        try {
          const existing = await Keyword.find({ 
            slug: { $in: input.keywordSlugs },
            isApproved: true 
          }, null, { session });
          
          if (existing.length !== input.keywordSlugs.length) {
            const foundSlugs = existing.map(k => k.slug);
            const missingSlugs = input.keywordSlugs.filter(slug => !foundSlugs.includes(slug));
            if (missingSlugs.length > 0) {
              console.warn(`Keywords not found: ${missingSlugs.join(', ')}`);
              errors.push(`Keywords not found: ${missingSlugs.join(', ')}`);
            }
          }
          
          allKeywords.push(...existing);
          console.log(`Found ${existing.length} existing keywords by slug`);
        } catch (error: any) {
          console.error('Error finding keywords by slug:', error);
          errors.push(`Failed to find keywords by slug: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      // 1.3) Handle keywordIds from payload (if provided)
      if (body.keywordIds && body.keywordIds.length > 0) {
        try {
          const existingByIds = await Keyword.find({ 
            _id: { $in: body.keywordIds },
            isApproved: true 
          }, null, { session });
          
          if (existingByIds.length !== body.keywordIds.length) {
            const foundIds = existingByIds.map(k => k._id.toString());
            const missingIds = body.keywordIds.filter((id: string) => !foundIds.includes(id.toString()));
            if (missingIds.length > 0) {
              console.warn(`Keywords not found by ID: ${missingIds.join(', ')}`);
              errors.push(`Keywords not found by ID: ${missingIds.join(', ')}`);
            }
          }
          
          allKeywords.push(...existingByIds);
          console.log(`Found ${existingByIds.length} existing keywords by ID`);
        } catch (error: any) {
          console.error('Error finding keywords by ID:', error);
          errors.push(`Failed to find keywords by ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      // Remove duplicates based on _id
      const uniqueKeywords = allKeywords.filter((keyword, index, self) => 
        index === self.findIndex(k => k._id.toString() === keyword._id.toString())
      );
      
      const keywordIds = uniqueKeywords.map(k => k._id);
      const keywordNames = uniqueKeywords.map(k => k.name);
      
      console.log(`Total keywords for scholar: ${keywordIds.length} (${created.length} new, ${uniqueKeywords.length - created.length} existing)`);

      // 2) Create Scholar
      console.log('Creating scholar with department:', input.department);
      const scholarData = {
        fullName: input.fullName,
        familyName: input.familyName,
        givenName: input.givenName,
        normalizedName: input.normalizedName.trim().toLowerCase(),
        slug: input.slug,
        title: input.title,
        affiliation: input.affiliation,
        department: input.department,
        position: input.position,
        email: input.email,
        phone: input.phone,
        homepageUrl: input.homepageUrl,
        scholarUrl: input.scholarUrl,
        institutionalProfileUrl: input.institutionalProfileUrl,
        orcid: input.orcid,
        bio: input.bio,
        researchInterests: input.researchInterests,
        expertiseAreas: input.expertiseAreas,
        avatarUrl: input.avatarUrl,
        keywordIds,
        keywordNames,
        status: input.status,
      };
      console.log('Scholar data to create:', JSON.stringify(scholarData, null, 2));
      
      // Create scholar using findByIdAndUpdate to ensure all fields are saved
      const tempScholar = new Scholar(scholarData);
      await tempScholar.save({ session });
      const s = tempScholar;
      console.log('Created scholar with department:', s.department);
      console.log('Full scholar object:', JSON.stringify(s.toObject(), null, 2));
      
      // Force update department field if it's missing
      if (!s.department && scholarData.department) {
        console.log('Department field missing, forcing update...');
        await Scholar.findByIdAndUpdate(s._id, { department: scholarData.department }, { session });
        s.department = scholarData.department;
        console.log('Updated scholar with department:', s.department);
      }

      // 3) Handle Publications: link existing ones and create new ones
      const allPublications: any[] = [];
      const createdPublications: any[] = [];
      let relatedCount = 0;
      
      // 3.1) Link existing publications by ID
      if (input.publicationIds && input.publicationIds.length > 0) {
        try {
          const existingPubs = await Publication.find({ 
            _id: { $in: input.publicationIds } 
          }, null, { session });
          
          // Add scholar to existing publications
          for (const pub of existingPubs) {
            if (!pub.scholarIds.includes(s._id)) {
              await Publication.updateOne(
                { _id: pub._id },
                { $addToSet: { scholarIds: s._id } },
                { session }
              );
            }
            allPublications.push(pub);
            // For Vietnam Labor Research Portal, all linked publications are considered related
            if (pub.isVietnamLabourRelated !== false) relatedCount += 1;
          }
          
          // Update scholar with publication IDs
          await Scholar.updateOne(
            { _id: s._id },
            { $addToSet: { publicationIds: { $each: input.publicationIds } } },
            { session }
          );
          
          console.log(`Linked ${existingPubs.length} existing publications`);
        } catch (error: any) {
          console.error('Error linking existing publications:', error);
          errors.push(`Failed to link existing publications: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      // 3.2) Create new publications
      if (input.newPublications && input.newPublications.length > 0) {
        try {
          const newPubDocs = input.newPublications.map((p: any) => {
            const pubKeywordSlugs = p.keywordSlugs || [];
            const mapped = allKeywords.filter((k: any) => pubKeywordSlugs.includes(k.slug));
            const pubKeywordIds = mapped.map(k => k._id);
            const isRelated = p.isVietnamLabourRelated ?? true;
            if (isRelated) relatedCount += 1;
            
            // Map journal-article to article for database storage
            const pubType = p.type === "journal-article" ? "article" : (p.type || "article");
            
            return {
              scholarIds: [s._id],
              title: p.title,
              year: p.year,
              citationDetail: p.citationDetail,
              type: pubType,
              authors: p.authors || [],
              abstract: p.abstract,
              quote: p.quote || '',
              doi: p.doi && p.doi.trim() !== '' ? p.doi : undefined,
              url: p.url && p.url.trim() !== '' ? p.url : undefined,
              keywordIds: pubKeywordIds,
              tags: p.tags || [],
              isVietnamLabourRelated: isRelated,
              citations: 0,
            };
          });
          
          // Check for duplicate DOIs before creating
          const doisToCheck = newPubDocs.filter(p => p.doi).map(p => p.doi);
          if (doisToCheck.length > 0) {
            const existingDois = await Publication.find({ 
              doi: { $in: doisToCheck } 
            }, { doi: 1 }, { session });
            
            const existingDoiSet = new Set(existingDois.map(p => p.doi));
            const validPubs = newPubDocs.filter(p => !p.doi || !existingDoiSet.has(p.doi));
            const duplicateDois = newPubDocs.filter(p => p.doi && existingDoiSet.has(p.doi));
            
            if (duplicateDois.length > 0) {
              console.warn(`Skipping publications with duplicate DOIs: ${duplicateDois.map(p => p.doi).join(', ')}`);
              errors.push(`Skipped publications with duplicate DOIs: ${duplicateDois.map(p => p.doi).join(', ')}`);
            }
            
            if (validPubs.length > 0) {
              const createdPubs = await Publication.insertMany(validPubs, { session, ordered: false });
              createdPublications.push(...createdPubs);
              allPublications.push(...createdPubs);
              
              // Update scholar with new publication IDs
              const newPubIds = createdPubs.map(pub => pub._id);
              await Scholar.updateOne(
                { _id: s._id },
                { $addToSet: { publicationIds: { $each: newPubIds } } },
                { session }
              );
              
              console.log(`Created ${createdPubs.length} new publications`);
            }
          } else {
            const createdPubs = await Publication.insertMany(newPubDocs, { session, ordered: false });
            createdPublications.push(...createdPubs);
            allPublications.push(...createdPubs);
            
            // Update scholar with new publication IDs
            const newPubIds = createdPubs.map(pub => pub._id);
            await Scholar.updateOne(
              { _id: s._id },
              { $addToSet: { publicationIds: { $each: newPubIds } } },
              { session }
            );
            
            console.log(`Created ${createdPubs.length} new publications`);
          }
        } catch (error: any) {
          console.error('Error creating new publications:', error);
          errors.push(`Failed to create new publications: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      // Legacy publications section removed to prevent duplicates
      if (false) { // Disabled legacy publications
        try {
          const legacyPubDocs = input.publications.map((p: any) => {
            const pubKeywordSlugs = p.keywordSlugs || [];
            const mapped = allKeywords.filter((k: any) => pubKeywordSlugs.includes(k.slug));
            const pubKeywordIds = mapped.map(k => k._id);
            const isRelated = p.isVietnamLabourRelated ?? true;
            if (isRelated) relatedCount += 1;
            
            // Map journal-article to article for database storage
            const pubType = p.type === "journal-article" ? "article" : (p.type || "article");
            
            return {
              scholarIds: [s._id],
              title: p.title,
              year: p.year,
              citationDetail: p.citationDetail,
              type: pubType,
              authors: p.authors || [],
              abstract: p.abstract,
              quote: p.quote || '',
              doi: p.doi && p.doi.trim() !== '' ? p.doi : undefined,
              url: p.url && p.url.trim() !== '' ? p.url : undefined,
              keywordIds: pubKeywordIds,
              tags: p.tags || [],
              isVietnamLabourRelated: isRelated,
              citations: 0,
            };
          });
          
          const legacyPubs = await Publication.insertMany(legacyPubDocs, { session, ordered: false });
          createdPublications.push(...legacyPubs);
          allPublications.push(...legacyPubs);
          
          // Update scholar with legacy publication IDs
          const legacyPubIds = legacyPubs.map(pub => pub._id);
          await Scholar.updateOne(
            { _id: s._id },
            { $addToSet: { publicationIds: { $each: legacyPubIds } } },
            { session }
          );
          
          console.log(`Created ${legacyPubs.length} legacy publications`);
        } catch (error: any) {
          console.error('Error creating legacy publications:', error);
          errors.push(`Failed to create legacy publications: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      // Update scholar with publication counts and IDs
      if (allPublications.length > 0) {
        const publicationIds = allPublications.map(pub => pub._id);
        const frequentContributor = relatedCount >= 3;
        await Scholar.updateOne(
          { _id: s._id },
          { $set: { 
            publicationIds: publicationIds,
            publicationCount: allPublications.length, 
            relatedPublicationCount: relatedCount,
            frequentContributor: frequentContributor
          } },
          { session }
        );
      }

      await session.commitTransaction();
      
      // Fetch updated scholar with populated data
      const updatedScholar = await Scholar.findById(s._id)
        .populate('keywordIds', 'name displayName slug')
        .populate('publicationIds', 'title authors year citationDetail type abstract doi url isVietnamLabourRelated')
        .lean();
      
      // Prepare detailed result
      const result = { 
        scholarId: s._id, 
        createdKeywords: created.map(k => ({
          _id: k._id,
          name: k.name,
          slug: k.slug,
          displayName: k.displayName
        })),
        existingKeywords: uniqueKeywords.filter(k => !created.some(c => c._id.toString() === k._id.toString())).map(k => ({
          _id: k._id,
          name: k.name,
          slug: k.slug,
          displayName: k.displayName
        })),
        totalKeywords: uniqueKeywords.length,
        createdPublications: createdPublications.map(p => ({
          _id: p._id,
          title: p.title,
          year: p.year,
          type: p.type,
          authors: p.authors
        })),
        linkedPublications: allPublications.filter(p => !createdPublications.some(c => c._id.toString() === p._id.toString())).map(p => ({
          _id: p._id,
          title: p.title,
          year: p.year,
          type: p.type,
          authors: p.authors
        })),
        totalPublications: allPublications.length,
        warnings: errors.length > 0 ? errors : undefined
      };
      
      return NextResponse.json({
        success: true,
        data: updatedScholar,
        result
      }, { status: 201 });
    } catch (err: any) {
      console.error(err);
      if (session) {
        try {
          await session.abortTransaction();
        } catch (abortErr) {
          console.error('Error aborting transaction:', abortErr);
        }
      }
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    } finally {
      if (session) {
        try {
          await session.endSession();
        } catch (endErr) {
          console.error('Error ending session:', endErr);
        }
      }
    }
  } catch (error: any) {
    console.error('Error creating scholar:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}