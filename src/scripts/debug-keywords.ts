import { connectToDatabase } from "@/lib/db";
import { Keyword } from "@/models";

async function debugKeywords() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await connectToDatabase();
    console.log("✅ Connected to MongoDB!");

    // Check if we have any keywords
    const keywordCount = await Keyword.countDocuments({});
    console.log(`📊 Total keywords in database: ${keywordCount}`);

    if (keywordCount > 0) {
      // Get first 5 keywords
      const keywords = await Keyword.find({}).limit(5).lean();
      console.log("\n📋 Sample keywords:");
      keywords.forEach((keyword, index) => {
        console.log(`${index + 1}. ${keyword.displayName} (${keyword.slug}) - Approved: ${keyword.isApproved}`);
      });
    } else {
      console.log("❌ No keywords found in database");
      console.log("💡 Try running: npm run seed:keywords");
    }

    // Test API endpoint
    console.log("\n🌐 Testing API endpoint...");
    const response = await fetch('http://localhost:3000/api/admin/keywords');
    const data = await response.json();
    
    console.log("API Response:", {
      success: data.success,
      dataLength: data.data?.length || 0,
      pagination: data.pagination
    });

  } catch (error) {
    console.error("❌ Error debugging keywords:", error);
    
    if (error instanceof Error && error.message.includes('MONGODB_URI')) {
      console.log("\n💡 Make sure to create .env.local file with MONGODB_URI");
    }
  }
}

// Run the debug
debugKeywords();
