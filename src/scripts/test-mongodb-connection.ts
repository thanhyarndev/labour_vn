import { connectToDatabase } from "@/lib/db";
import { Keyword } from "@/models";

async function testMongoDBConnection() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await connectToDatabase();
    console.log("✅ Successfully connected to MongoDB!");

    // Test creating a keyword
    console.log("📝 Testing keyword creation...");
    const testKeyword = new Keyword({
      name: "test-keyword",
      displayName: "Test Keyword",
      slug: "test-keyword",
      aliases: ["test", "example"],
      description: "This is a test keyword for MongoDB connection testing",
      isApproved: true
    });

    await testKeyword.save();
    console.log("✅ Successfully created test keyword:", testKeyword._id);

    // Test finding keywords
    console.log("🔍 Testing keyword retrieval...");
    const keywords = await Keyword.find({}).limit(5);
    console.log(`✅ Found ${keywords.length} keywords in database`);

    // Clean up test keyword
    console.log("🧹 Cleaning up test keyword...");
    await Keyword.findByIdAndDelete(testKeyword._id);
    console.log("✅ Test keyword deleted successfully");

    console.log("🎉 All tests passed! MongoDB is working correctly.");
  } catch (error) {
    console.error("❌ Error testing MongoDB connection:", error);
    process.exit(1);
  }
}

// Run the test
testMongoDBConnection();
