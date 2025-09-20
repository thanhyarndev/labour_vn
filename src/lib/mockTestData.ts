// Mock data for testing the Vietnam Labor Research Portal

// ===== KEYWORDS =====
export const mockKeywords = [
  {
    name: "labour law",
    displayName: "Labour Law",
    slug: "labour-law",
    aliases: ["labor law", "employment law", "workplace law"],
    description: "Legal framework governing employment relationships and worker rights",
    isApproved: true
  },
  {
    name: "migrant workers",
    displayName: "Migrant Workers",
    slug: "migrant-workers",
    aliases: ["migrant labour", "foreign workers", "guest workers"],
    description: "Workers who move from one region or country to another for employment",
    isApproved: true
  },
  {
    name: "trade unions",
    displayName: "Trade Unions",
    slug: "trade-unions",
    aliases: ["labor unions", "worker organizations", "syndicates"],
    description: "Organizations representing workers' interests and collective bargaining",
    isApproved: true
  },
  {
    name: "social protection",
    displayName: "Social Protection",
    slug: "social-protection",
    aliases: ["social security", "welfare", "social safety net"],
    description: "Policies and programs providing income security and social services",
    isApproved: true
  },
  {
    name: "informal economy",
    displayName: "Informal Economy",
    slug: "informal-economy",
    aliases: ["informal sector", "unregulated work", "casual employment"],
    description: "Economic activities not regulated or protected by government",
    isApproved: true
  },
  {
    name: "minimum wage",
    displayName: "Minimum Wage",
    slug: "minimum-wage",
    aliases: ["basic wage", "floor wage", "living wage"],
    description: "Lowest wage rate legally permitted for workers",
    isApproved: true
  },
  {
    name: "gender equality",
    displayName: "Gender Equality",
    slug: "gender-equality",
    aliases: ["gender equity", "women's rights", "gender justice"],
    description: "Equal rights, responsibilities and opportunities for all genders",
    isApproved: true
  },
  {
    name: "child labour",
    displayName: "Child Labour",
    slug: "child-labour",
    aliases: ["child work", "youth employment", "minors working"],
    description: "Employment of children in work that deprives them of childhood",
    isApproved: true
  }
];

// ===== PUBLICATIONS =====
export const mockPublications = [
  {
    id: "1",
    title: "Labour Rights in Vietnam: A Comprehensive Analysis",
    authors: ["Nguyen Van An", "Tran Thi Binh"],
    journalPublisher: "Journal of Southeast Asian Studies",
    year: 2023,
    volume: "45",
    issue: "2",
    pages: "123-145",
    doi: "10.1234/jseas.2023.45.2.123",
    url: "https://example.com/publication/1",
    citationCount: 15,
    abstract: "This paper examines the current state of labour rights in Vietnam, focusing on recent legal reforms and their impact on worker protection. The study analyzes key legislation including the 2019 Labour Code and its implementation across different sectors.",
    quote: "The findings suggest significant improvements in labour protection mechanisms, particularly for formal sector workers.",
    publicationType: "journal-article",
    isSelected: true
  },
  {
    id: "2",
    title: "Migrant Workers and Social Protection in Vietnam",
    authors: ["Le Hoang Nam"],
    journalPublisher: "Asian Development Review",
    year: 2023,
    volume: "40",
    issue: "1",
    pages: "67-89",
    doi: "10.5678/adr.2023.40.1.67",
    url: "https://example.com/publication/2",
    citationCount: 8,
    abstract: "This study analyzes the social protection mechanisms available to migrant workers in Vietnam, examining gaps in coverage and policy recommendations for improvement.",
    quote: "Migrant workers face significant challenges in accessing social benefits due to administrative barriers and limited awareness.",
    publicationType: "journal-article",
    isSelected: false
  },
  {
    id: "3",
    title: "Trade Union Development in Post-Doi Moi Vietnam",
    authors: ["Pham Thi Mai", "Vo Duc Thang"],
    journalPublisher: "Industrial Relations Journal",
    year: 2022,
    volume: "53",
    issue: "4",
    pages: "312-328",
    doi: "10.1111/irj.12345",
    url: "https://example.com/publication/3",
    citationCount: 12,
    abstract: "This article traces the evolution of trade unions in Vietnam since the Doi Moi reforms, analyzing their role in collective bargaining and worker representation.",
    quote: "Trade unions have gradually gained more autonomy but still face constraints in fully representing worker interests.",
    publicationType: "journal-article",
    isSelected: true
  },
  {
    id: "4",
    title: "Gender and Labour Market Participation in Vietnam",
    authors: ["Tran Thi Lan", "Nguyen Van Duc"],
    journalPublisher: "Feminist Economics",
    year: 2022,
    volume: "28",
    issue: "3",
    pages: "45-67",
    doi: "10.1080/13545701.2022.1234567",
    url: "https://example.com/publication/4",
    citationCount: 18,
    abstract: "This study investigates gender disparities in labour market participation in Vietnam, examining both formal and informal employment sectors.",
    quote: "Women continue to face wage gaps and limited access to leadership positions despite increasing educational attainment.",
    publicationType: "journal-article",
    isSelected: false
  },
  {
    id: "5",
    title: "Informal Economy and Worker Vulnerability in Urban Vietnam",
    authors: ["Le Thi Hong", "Pham Van Minh"],
    journalPublisher: "Development and Change",
    year: 2023,
    volume: "54",
    issue: "2",
    pages: "234-256",
    doi: "10.1111/dech.12345",
    url: "https://example.com/publication/5",
    citationCount: 9,
    abstract: "This paper explores the working conditions and vulnerabilities of informal sector workers in Vietnam's major cities.",
    quote: "Informal workers lack social protection and face high levels of job insecurity and income volatility.",
    publicationType: "journal-article",
    isSelected: true
  },
  {
    id: "6",
    title: "Minimum Wage Policy and Its Impact on Vietnamese Workers",
    authors: ["Nguyen Thi Hoa", "Tran Van Long"],
    journalPublisher: "Labour Economics",
    year: 2022,
    volume: "78",
    pages: "102345",
    doi: "10.1016/j.labeco.2022.102345",
    url: "https://example.com/publication/6",
    citationCount: 14,
    abstract: "This study evaluates the effectiveness of minimum wage policies in Vietnam and their impact on worker welfare and employment.",
    quote: "Minimum wage increases have improved living standards but may have contributed to job losses in some sectors.",
    publicationType: "journal-article",
    isSelected: false
  },
  {
    id: "7",
    title: "Child Labour in Vietnam: Current Trends and Policy Responses",
    authors: ["Vo Thi Kim", "Le Van Nam"],
    journalPublisher: "Children and Youth Services Review",
    year: 2023,
    volume: "145",
    pages: "106789",
    doi: "10.1016/j.childyouth.2022.106789",
    url: "https://example.com/publication/7",
    citationCount: 7,
    abstract: "This research examines the prevalence and characteristics of child labour in Vietnam and evaluates government responses.",
    quote: "While child labour rates have declined, rural areas and certain industries still show concerning levels of child employment.",
    publicationType: "journal-article",
    isSelected: true
  },
  {
    id: "8",
    title: "Digitalization and the Future of Work in Vietnam",
    authors: ["Pham Thi Linh", "Nguyen Van Tuan"],
    journalPublisher: "Technology in Society",
    year: 2023,
    volume: "72",
    pages: "102156",
    doi: "10.1016/j.techsoc.2022.102156",
    url: "https://example.com/publication/8",
    citationCount: 11,
    abstract: "This paper explores how digitalization is transforming the Vietnamese labour market and its implications for workers.",
    quote: "Digital transformation presents both opportunities and challenges for Vietnamese workers, requiring new skills and adaptation strategies.",
    publicationType: "journal-article",
    isSelected: false
  }
];

// ===== SCHOLARS =====
export const mockScholars = [
  {
    _id: "1",
    fullName: "Nguyen Van An",
    familyName: "Nguyen",
    givenName: "Van An",
    normalizedName: "nguyen van an",
    slug: "nguyen-van-an",
    affiliation: "University of Social Sciences and Humanities, VNU-HCM",
    email: "nguyen.van.an@hcmussh.edu.vn",
    bio: "Professor of Labour Studies with over 15 years of experience in researching Vietnamese labour markets and worker rights.",
    avatarUrl: "",
    keywordIds: [
      { _id: "1", name: "labour law", displayName: "Labour Law", slug: "labour-law" },
      { _id: "2", name: "migrant workers", displayName: "Migrant Workers", slug: "migrant-workers" }
    ],
    keywordNames: ["labour law", "migrant workers"],
    publicationCount: 3,
    relatedPublicationCount: 3,
    frequentContributor: true,
    status: "active"
  },
  {
    _id: "2",
    fullName: "Tran Thi Binh",
    familyName: "Tran",
    givenName: "Thi Binh",
    normalizedName: "tran thi binh",
    slug: "tran-thi-binh",
    affiliation: "Institute of Labour Science and Social Affairs",
    email: "tran.thi.binh@molisa.gov.vn",
    bio: "Senior researcher specializing in social protection policies and gender equality in the workplace.",
    avatarUrl: "",
    keywordIds: [
      { _id: "4", name: "social protection", displayName: "Social Protection", slug: "social-protection" },
      { _id: "7", name: "gender equality", displayName: "Gender Equality", slug: "gender-equality" }
    ],
    keywordNames: ["social protection", "gender equality"],
    publicationCount: 2,
    relatedPublicationCount: 2,
    frequentContributor: true,
    status: "active"
  },
  {
    _id: "3",
    fullName: "Le Hoang Nam",
    familyName: "Le",
    givenName: "Hoang Nam",
    normalizedName: "le hoang nam",
    slug: "le-hoang-nam",
    affiliation: "Vietnam National University, Hanoi",
    email: "le.hoang.nam@vnu.edu.vn",
    bio: "Associate Professor focusing on informal economy and worker vulnerability in urban areas.",
    avatarUrl: "",
    keywordIds: [
      { _id: "5", name: "informal economy", displayName: "Informal Economy", slug: "informal-economy" },
      { _id: "6", name: "minimum wage", displayName: "Minimum Wage", slug: "minimum-wage" }
    ],
    keywordNames: ["informal economy", "minimum wage"],
    publicationCount: 2,
    relatedPublicationCount: 2,
    frequentContributor: false,
    status: "active"
  },
  {
    _id: "4",
    fullName: "Pham Thi Mai",
    familyName: "Pham",
    givenName: "Thi Mai",
    normalizedName: "pham thi mai",
    slug: "pham-thi-mai",
    affiliation: "Ho Chi Minh City University of Economics",
    email: "pham.thi.mai@ueh.edu.vn",
    bio: "Lecturer and researcher in industrial relations and trade union development in Vietnam.",
    avatarUrl: "",
    keywordIds: [
      { _id: "3", name: "trade unions", displayName: "Trade Unions", slug: "trade-unions" }
    ],
    keywordNames: ["trade unions"],
    publicationCount: 1,
    relatedPublicationCount: 1,
    frequentContributor: false,
    status: "active"
  },
  {
    _id: "5",
    fullName: "Vo Duc Thang",
    familyName: "Vo",
    givenName: "Duc Thang",
    normalizedName: "vo duc thang",
    slug: "vo-duc-thang",
    affiliation: "University of Economics, Ho Chi Minh City",
    email: "vo.duc.thang@ueh.edu.vn",
    bio: "Professor of Economics with expertise in labour market analysis and policy evaluation.",
    avatarUrl: "",
    keywordIds: [
      { _id: "1", name: "labour law", displayName: "Labour Law", slug: "labour-law" },
      { _id: "3", name: "trade unions", displayName: "Trade Unions", slug: "trade-unions" }
    ],
    keywordNames: ["labour law", "trade unions"],
    publicationCount: 1,
    relatedPublicationCount: 1,
    frequentContributor: false,
    status: "active"
  },
  {
    _id: "6",
    fullName: "Tran Thi Lan",
    familyName: "Tran",
    givenName: "Thi Lan",
    normalizedName: "tran thi lan",
    slug: "tran-thi-lan",
    affiliation: "Vietnam Academy of Social Sciences",
    email: "tran.thi.lan@vass.gov.vn",
    bio: "Senior researcher specializing in gender studies and women's labour market participation.",
    avatarUrl: "",
    keywordIds: [
      { _id: "7", name: "gender equality", displayName: "Gender Equality", slug: "gender-equality" }
    ],
    keywordNames: ["gender equality"],
    publicationCount: 1,
    relatedPublicationCount: 1,
    frequentContributor: false,
    status: "active"
  },
  {
    _id: "7",
    fullName: "Nguyen Van Duc",
    familyName: "Nguyen",
    givenName: "Van Duc",
    normalizedName: "nguyen van duc",
    slug: "nguyen-van-duc",
    affiliation: "Hanoi University of Science and Technology",
    email: "nguyen.van.duc@hust.edu.vn",
    bio: "Associate Professor researching digitalization and its impact on the future of work.",
    avatarUrl: "",
    keywordIds: [
      { _id: "8", name: "digitalization", displayName: "Digitalization", slug: "digitalization" }
    ],
    keywordNames: ["digitalization"],
    publicationCount: 1,
    relatedPublicationCount: 1,
    frequentContributor: false,
    status: "active"
  },
  {
    _id: "8",
    fullName: "Le Thi Hong",
    familyName: "Le",
    givenName: "Thi Hong",
    normalizedName: "le thi hong",
    slug: "le-thi-hong",
    affiliation: "Can Tho University",
    email: "le.thi.hong@ctu.edu.vn",
    bio: "Lecturer and researcher focusing on informal economy and urban worker vulnerability.",
    avatarUrl: "",
    keywordIds: [
      { _id: "5", name: "informal economy", displayName: "Informal Economy", slug: "informal-economy" }
    ],
    keywordNames: ["informal economy"],
    publicationCount: 1,
    relatedPublicationCount: 1,
    frequentContributor: false,
    status: "active"
  }
];

// ===== USERS (for admin testing) =====
export const mockUsers = [
  {
    id: "1",
    email: "admin@labor-vn.com",
    name: "Admin User",
    role: "admin",
    avatar: "",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "2",
    email: "editor@labor-vn.com",
    name: "Content Editor",
    role: "editor",
    avatar: "",
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  }
];

// ===== POSTS (for updates and insights) =====
export const mockPosts = [
  {
    id: "1",
    slug: "new-research-labour-rights-vietnam",
    title: "New Research on Labour Rights in Vietnam",
    content: "We are excited to announce the publication of a comprehensive study on labour rights in Vietnam, examining recent legal reforms and their impact on worker protection.",
    excerpt: "Comprehensive study on labour rights in Vietnam examines recent legal reforms and their impact on worker protection.",
    authorId: "1",
    category: "research",
    tags: ["labour rights", "research", "publication"],
    featuredImageUrl: "",
    readTime: 3,
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date("2024-01-20"),
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "2",
    slug: "conference-labour-studies-2024",
    title: "Upcoming Conference: Labour Studies 2024",
    content: "Join us for the annual Labour Studies Conference 2024, featuring presentations on migrant workers, social protection, and gender equality in the workplace.",
    excerpt: "Annual Labour Studies Conference 2024 featuring presentations on migrant workers, social protection, and gender equality.",
    authorId: "1",
    category: "event",
    tags: ["conference", "labour studies", "event"],
    featuredImageUrl: "",
    readTime: 2,
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date("2024-01-18"),
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18")
  },
  {
    id: "3",
    slug: "minimum-wage-increase-2024",
    title: "Minimum Wage Increase Announced for 2024",
    content: "The Vietnamese government has announced a 6% increase in minimum wage for 2024, affecting workers across all regions. This article analyzes the potential impact on worker welfare and employment.",
    excerpt: "Vietnamese government announces 6% minimum wage increase for 2024, with analysis of potential impact on worker welfare and employment.",
    authorId: "2",
    category: "policy",
    tags: ["minimum wage", "policy", "government"],
    featuredImageUrl: "",
    readTime: 4,
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date("2024-01-15"),
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  }
];
