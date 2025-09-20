import { connectToDatabase } from '../lib/db';
import { Scholar } from '../models/Scholar';
import { Publication } from '../models/Publication';

async function updateScholarPublications() {
  try {
    await connectToDatabase();
    
    // Find scholar by ID
    const scholarId = '68cd05fa194c6e43616a5bd6';
    const scholar = await Scholar.findById(scholarId);
    
    if (!scholar) {
      console.log('Scholar not found');
      return;
    }
    
    console.log('Current scholar:', {
      _id: scholar._id,
      fullName: scholar.fullName,
      publicationCount: scholar.publicationCount,
      publicationIds: scholar.publicationIds
    });
    
    // Find publications that have this scholar in their scholarIds
    const publications = await Publication.find({ 
      scholarIds: scholar._id 
    });
    
    console.log('Found publications:', publications.length);
    publications.forEach(pub => {
      console.log('-', pub.title, 'ID:', pub._id);
    });
    
    // Update scholar with publication IDs
    const publicationIds = publications.map(pub => pub._id);
    await Scholar.updateOne(
      { _id: scholar._id },
      { $set: { publicationIds } }
    );
    
    console.log('Updated scholar with publication IDs:', publicationIds);
    
    // Verify update
    const updatedScholar = await Scholar.findById(scholarId);
    console.log('Updated scholar publicationIds:', updatedScholar?.publicationIds);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

updateScholarPublications();
