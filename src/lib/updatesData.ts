export interface UpdatePost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: "new-scholar" | "new-research" | "event" | "analysis" | "announcement";
  tags: string[];
  featured: boolean;
  imageUrl?: string;
  readTime: number; // in minutes
}

export const mockUpdates: UpdatePost[] = [
  {
    id: "1",
    title: "New Scholar Joins Portal: Dr. Minh Nguyen Specializes in Digital Labour",
    excerpt: "We're excited to welcome Dr. Minh Nguyen from the University of Economics Ho Chi Minh City, whose research focuses on the impact of digitalization on Vietnamese labour markets.",
    content: "Dr. Minh Nguyen brings extensive expertise in digital labour studies, with particular focus on platform work and gig economy in Vietnam. His recent publication 'Digital Transformation and Labour Rights in Vietnam' has been widely cited in policy discussions. Dr. Nguyen's research addresses critical questions about how digital platforms are reshaping traditional employment relationships and what this means for worker protections in Vietnam.",
    author: "Portal Team",
    publishDate: "2024-01-15",
    category: "new-scholar",
    tags: ["digital labour", "platform work", "gig economy", "labour rights"],
    featured: true,
    readTime: 3
  },
  {
    id: "2",
    title: "New Research: Minimum Wage Policy Impact Analysis 2024",
    excerpt: "A comprehensive study by Dr. Trang Tran reveals significant insights into the effects of recent minimum wage adjustments on employment and productivity in Vietnam's manufacturing sector.",
    content: "The study, published in the International Labour Review, examines data from 500+ manufacturing firms across Vietnam. Key findings include: 1) Minimum wage increases led to 8% productivity gains in formal sector, 2) Informal sector employment increased by 12%, 3) Gender wage gap narrowed by 3 percentage points. The research provides crucial evidence for ongoing policy discussions about wage-setting mechanisms in Vietnam.",
    author: "Dr. Trang Tran",
    publishDate: "2024-01-12",
    category: "new-research",
    tags: ["minimum wage", "policy analysis", "manufacturing", "productivity"],
    featured: true,
    readTime: 5
  },
  {
    id: "3",
    title: "Upcoming Conference: 'Future of Work in Vietnam' - March 2024",
    excerpt: "Join leading researchers and policymakers for a two-day conference exploring the challenges and opportunities facing Vietnam's labour market in the digital age.",
    content: "The conference will feature keynote presentations by international experts, panel discussions on emerging labour trends, and workshops on research methodologies. Topics include: automation and employment, remote work policies, skills development for digital economy, and social protection for platform workers. Registration opens February 1st. Early bird pricing available until February 15th.",
    author: "Conference Organizers",
    publishDate: "2024-01-10",
    category: "event",
    tags: ["conference", "future of work", "digital economy", "policy"],
    featured: false,
    readTime: 2
  },
  {
    id: "4",
    title: "Analysis: Labour Migration Trends in Post-COVID Vietnam",
    excerpt: "Our latest analysis reveals shifting patterns in internal and international labour migration, with significant implications for regional development and social policy.",
    content: "The analysis shows three key trends: 1) Accelerated rural-to-urban migration, particularly among young workers, 2) Increased return migration from overseas due to COVID-19 restrictions, 3) Growing importance of circular migration patterns. These trends suggest the need for more flexible social protection systems and better integration of migrant workers into urban labour markets. The full report includes policy recommendations for addressing these challenges.",
    author: "Research Team",
    publishDate: "2024-01-08",
    category: "analysis",
    tags: ["labour migration", "COVID-19", "rural-urban", "social policy"],
    featured: false,
    readTime: 4
  },
  {
    id: "5",
    title: "Portal Update: Enhanced Search Features Now Available",
    excerpt: "We've launched new search capabilities including advanced filters, keyword suggestions, and improved result ranking to help you find relevant scholars more efficiently.",
    content: "The enhanced search system now includes: 1) Advanced filtering by research area, institution, and publication count, 2) Real-time keyword suggestions based on our database, 3) Improved ranking algorithm that considers both relevance and scholar activity, 4) Export functionality for search results. These improvements are based on user feedback and aim to make the portal more user-friendly for both students and researchers.",
    author: "Technical Team",
    publishDate: "2024-01-05",
    category: "announcement",
    tags: ["portal update", "search features", "user experience", "technology"],
    featured: false,
    readTime: 2
  },
  {
    id: "6",
    title: "New Research: Gender and Labour Market Participation in Vietnam",
    excerpt: "Dr. Pham Thi Dung's latest study examines the persistent gender gaps in labour force participation and identifies key factors influencing women's employment decisions.",
    content: "The research, based on a longitudinal survey of 2,000 households, reveals that while women's educational attainment has increased significantly, their labour force participation rate remains below that of men. Key findings include: 1) Care responsibilities remain the primary barrier to women's employment, 2) Flexible work arrangements increase women's participation by 15%, 3) Social norms continue to influence employment decisions. The study provides evidence for policies supporting work-life balance and challenging traditional gender roles.",
    author: "Dr. Pham Thi Dung",
    publishDate: "2024-01-03",
    category: "new-research",
    tags: ["gender", "labour participation", "work-life balance", "social norms"],
    featured: false,
    readTime: 4
  },
  {
    id: "7",
    title: "Workshop: Research Methods in Labour Studies - February 2024",
    excerpt: "A hands-on workshop for graduate students and early-career researchers on quantitative and qualitative methods in labour research.",
    content: "The workshop will cover: 1) Survey design and implementation, 2) Statistical analysis of labour market data, 3) Qualitative interviewing techniques, 4) Mixed-methods approaches, 5) Ethical considerations in labour research. Participants will work with real datasets and receive individual feedback on their research proposals. Limited to 25 participants. Application deadline: January 25th.",
    author: "Training Team",
    publishDate: "2024-01-01",
    category: "event",
    tags: ["workshop", "research methods", "graduate students", "training"],
    featured: false,
    readTime: 2
  },
  {
    id: "8",
    title: "Analysis: The Impact of AI on Vietnamese Labour Markets",
    excerpt: "Our research team explores how artificial intelligence and automation are reshaping employment patterns in Vietnam's key economic sectors.",
    content: "The analysis reveals that while AI adoption is still in early stages, certain sectors are already experiencing significant changes. Manufacturing shows the highest automation potential, with 30% of tasks potentially automatable. Services sector shows mixed impacts, with some jobs being displaced while new opportunities emerge. The study recommends: 1) Investment in digital skills training, 2) Development of social protection for displaced workers, 3) Support for workers transitioning to new roles. The full report includes sector-specific recommendations and policy implications.",
    author: "Research Team",
    publishDate: "2023-12-28",
    category: "analysis",
    tags: ["artificial intelligence", "automation", "employment", "skills training"],
    featured: true,
    readTime: 6
  }
];

export const getUpdatesByCategory = (category: string): UpdatePost[] => {
  if (category === "all") return mockUpdates;
  return mockUpdates.filter(update => update.category === category);
};

export const getFeaturedUpdates = (): UpdatePost[] => {
  return mockUpdates.filter(update => update.featured);
};

export const searchUpdates = (query: string): UpdatePost[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockUpdates.filter(update => 
    update.title.toLowerCase().includes(lowercaseQuery) ||
    update.excerpt.toLowerCase().includes(lowercaseQuery) ||
    update.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getCategoryInfo = () => [
  { id: "all", name: "All Updates", count: mockUpdates.length },
  { id: "new-scholar", name: "New Scholars", count: mockUpdates.filter(u => u.category === "new-scholar").length },
  { id: "new-research", name: "New Research", count: mockUpdates.filter(u => u.category === "new-research").length },
  { id: "event", name: "Events", count: mockUpdates.filter(u => u.category === "event").length },
  { id: "analysis", name: "Analysis", count: mockUpdates.filter(u => u.category === "analysis").length },
  { id: "announcement", name: "Announcements", count: mockUpdates.filter(u => u.category === "announcement").length }
];

