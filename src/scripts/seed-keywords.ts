import { connectToDatabase } from "@/lib/db";
import { Keyword } from "@/models";

const sampleKeywords = [
  {
    name: "labour-law",
    displayName: "Labour Law",
    slug: "labour-law",
    aliases: ["labor law", "employment law", "workplace law", "luật lao động"],
    description: "Legal framework governing employment relationships and worker rights",
    isApproved: true
  },
  {
    name: "migrant-workers",
    displayName: "Migrant Workers",
    slug: "migrant-workers",
    aliases: ["migrant labour", "foreign workers", "guest workers", "lao động di cư"],
    description: "Workers who move from one region or country to another for employment",
    isApproved: true
  },
  {
    name: "trade-unions",
    displayName: "Trade Unions",
    slug: "trade-unions",
    aliases: ["labor unions", "worker organizations", "syndicates", "công đoàn"],
    description: "Organizations representing workers' interests and collective bargaining",
    isApproved: true
  },
  {
    name: "social-protection",
    displayName: "Social Protection",
    slug: "social-protection",
    aliases: ["social security", "welfare", "social safety net", "bảo trợ xã hội"],
    description: "Policies and programs providing income security and social services",
    isApproved: true
  },
  {
    name: "informal-economy",
    displayName: "Informal Economy",
    slug: "informal-economy",
    aliases: ["informal sector", "unregulated work", "casual employment", "kinh tế phi chính thức"],
    description: "Economic activities not regulated or protected by government",
    isApproved: true
  },
  {
    name: "minimum-wage",
    displayName: "Minimum Wage",
    slug: "minimum-wage",
    aliases: ["basic wage", "living wage", "tiền lương tối thiểu"],
    description: "The lowest wage that employers are legally allowed to pay workers",
    isApproved: true
  },
  {
    name: "workplace-safety",
    displayName: "Workplace Safety",
    slug: "workplace-safety",
    aliases: ["occupational safety", "work safety", "an toàn lao động"],
    description: "Conditions and practices that ensure the health and safety of workers",
    isApproved: true
  },
  {
    name: "collective-bargaining",
    displayName: "Collective Bargaining",
    slug: "collective-bargaining",
    aliases: ["union negotiations", "labor negotiations", "thương lượng tập thể"],
    description: "Process of negotiation between employers and workers' representatives",
    isApproved: true
  }
];

async function seedKeywords() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await connectToDatabase();
    console.log("✅ Connected to MongoDB!");

    // Clear existing keywords (optional - remove this if you want to keep existing data)
    console.log("🧹 Clearing existing keywords...");
    await Keyword.deleteMany({});
    console.log("✅ Existing keywords cleared");

    // Insert sample keywords
    console.log("📝 Inserting sample keywords...");
    const createdKeywords = await Keyword.insertMany(sampleKeywords);
    console.log(`✅ Successfully created ${createdKeywords.length} keywords`);

    // Display created keywords
    console.log("\n📋 Created keywords:");
    createdKeywords.forEach((keyword, index) => {
      console.log(`${index + 1}. ${keyword.displayName} (${keyword.slug})`);
    });

    console.log("\n🎉 Keywords seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding keywords:", error);
    process.exit(1);
  }
}

// Run the seeding
seedKeywords();
