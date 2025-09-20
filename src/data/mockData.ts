export interface MockScholar {
  id: string;
  fullName: string;
  familyName?: string;
  givenName?: string;
  slug: string;
  affiliation?: string;
  email?: string;
  homepageUrl?: string;
  scholarUrl?: string;
  orcid?: string;
  bio?: string;
  avatarUrl?: string;
  keywordNames: string[];
  publicationCount: number;
  relatedPublicationCount: number;
  frequentContributor: boolean;
  status: "active" | "hidden";
}

export interface MockPublication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal?: string;
  publisher?: string;
  doi?: string;
  abstract?: string;
  keywords: string[];
  scholarId: string;
}

export const mockScholars: MockScholar[] = [
  {
    id: "1",
    fullName: "Nguyễn Văn An",
    familyName: "Nguyễn",
    givenName: "Văn An",
    slug: "nguyen-van-an",
    affiliation: "Đại học Kinh tế Quốc dân",
    email: "nguyen.van.an@neu.edu.vn",
    homepageUrl: "https://neu.edu.vn/nguyen-van-an",
    scholarUrl: "https://scholar.google.com/citations?user=nguyenvanan",
    orcid: "0000-0001-1234-5678",
    bio: "Chuyên gia về luật lao động và quan hệ lao động tại Việt Nam. Có hơn 15 năm kinh nghiệm nghiên cứu về các vấn đề lao động, tiền lương tối thiểu và an toàn lao động.",
    avatarUrl: "/images/avatars/nguyen-van-an.jpg",
    keywordNames: ["labor law", "minimum wage", "labor relations", "occupational safety"],
    publicationCount: 25,
    relatedPublicationCount: 18,
    frequentContributor: true,
    status: "active"
  },
  {
    id: "2",
    fullName: "Trần Thị Bình",
    familyName: "Trần",
    givenName: "Thị Bình",
    slug: "tran-thi-binh",
    affiliation: "Viện Khoa học Lao động và Xã hội",
    email: "tran.thi.binh@molisa.gov.vn",
    homepageUrl: "https://molisa.gov.vn/tran-thi-binh",
    orcid: "0000-0002-2345-6789",
    bio: "Nghiên cứu viên cao cấp chuyên về chính sách lao động và bảo hiểm xã hội. Đã tham gia nhiều dự án nghiên cứu quốc tế về lao động nữ và bình đẳng giới.",
    keywordNames: ["social insurance", "women workers", "labor policy", "gender equality"],
    publicationCount: 32,
    relatedPublicationCount: 28,
    frequentContributor: true,
    status: "active"
  },
  {
    id: "3",
    fullName: "Lê Minh Cường",
    familyName: "Lê",
    givenName: "Minh Cường",
    slug: "le-minh-cuong",
    affiliation: "Đại học Luật Hà Nội",
    email: "le.minh.cuong@hlu.edu.vn",
    scholarUrl: "https://scholar.google.com/citations?user=leminhcuong",
    orcid: "0000-0003-3456-7890",
    bio: "Giáo sư Luật học chuyên về luật lao động quốc tế và giải quyết tranh chấp lao động. Có nhiều công trình nghiên cứu về hội nhập quốc tế trong lĩnh vực lao động.",
    keywordNames: ["labor law", "collective bargaining", "labor dispute resolution", "international labor law"],
    publicationCount: 41,
    relatedPublicationCount: 35,
    frequentContributor: true,
    status: "active"
  },
  {
    id: "4",
    fullName: "Phạm Thị Dung",
    familyName: "Phạm",
    givenName: "Thị Dung",
    slug: "pham-thi-dung",
    affiliation: "Đại học Kinh tế TP.HCM",
    email: "pham.thi.dung@ueh.edu.vn",
    homepageUrl: "https://ueh.edu.vn/pham-thi-dung",
    orcid: "0000-0004-4567-8901",
    bio: "Tiến sĩ Kinh tế học chuyên về thị trường lao động và việc làm. Nghiên cứu về tác động của công nghệ đến việc làm và chuyển đổi lao động.",
    keywordNames: ["labor market", "employment", "technology", "labor transformation"],
    publicationCount: 19,
    relatedPublicationCount: 12,
    frequentContributor: false,
    status: "active"
  },
  {
    id: "5",
    fullName: "Hoàng Văn Em",
    familyName: "Hoàng",
    givenName: "Văn Em",
    slug: "hoang-van-em",
    affiliation: "Viện Nghiên cứu Phát triển",
    email: "hoang.van.em@ids.org.vn",
    scholarUrl: "https://scholar.google.com/citations?user=hoangvanem",
    orcid: "0000-0005-5678-9012",
    bio: "Nghiên cứu viên chính về phát triển bền vững và lao động xanh. Chuyên gia về các vấn đề môi trường và lao động trong bối cảnh biến đổi khí hậu.",
    keywordNames: ["sustainable development", "green jobs", "climate change", "environmental labor"],
    publicationCount: 27,
    relatedPublicationCount: 15,
    frequentContributor: false,
    status: "active"
  },
  {
    id: "6",
    fullName: "Vũ Thị Phương",
    familyName: "Vũ",
    givenName: "Thị Phương",
    slug: "vu-thi-phuong",
    affiliation: "Đại học Mở TP.HCM",
    email: "vu.thi.phuong@ou.edu.vn",
    homepageUrl: "https://ou.edu.vn/vu-thi-phuong",
    orcid: "0000-0006-6789-0123",
    bio: "Giảng viên cao cấp chuyên về quản lý nguồn nhân lực và phát triển kỹ năng. Nghiên cứu về đào tạo nghề và phát triển nguồn nhân lực chất lượng cao.",
    keywordNames: ["human resource management", "skills development", "vocational training", "talent development"],
    publicationCount: 22,
    relatedPublicationCount: 8,
    frequentContributor: false,
    status: "active"
  },
  {
    id: "7",
    fullName: "Đặng Văn Giang",
    familyName: "Đặng",
    givenName: "Văn Giang",
    slug: "dang-van-giang",
    affiliation: "Trung tâm Nghiên cứu Chính sách",
    email: "dang.van.giang@cps.org.vn",
    scholarUrl: "https://scholar.google.com/citations?user=dangvangiang",
    orcid: "0000-0007-7890-1234",
    bio: "Chuyên gia chính sách công về lao động và việc làm. Tham gia xây dựng nhiều chính sách lao động quan trọng của quốc gia.",
    keywordNames: ["public policy", "employment policy", "labor governance", "policy analysis"],
    publicationCount: 35,
    relatedPublicationCount: 30,
    frequentContributor: true,
    status: "active"
  },
  {
    id: "8",
    fullName: "Bùi Thị Hoa",
    familyName: "Bùi",
    givenName: "Thị Hoa",
    slug: "bui-thi-hoa",
    affiliation: "Đại học Kinh tế - Luật",
    email: "bui.thi.hoa@uel.edu.vn",
    homepageUrl: "https://uel.edu.vn/bui-thi-hoa",
    orcid: "0000-0008-8901-2345",
    bio: "Nghiên cứu viên về kinh tế lao động và bất bình đẳng thu nhập. Chuyên gia về đo lường và phân tích các chỉ số lao động.",
    keywordNames: ["labor economics", "income inequality", "labor statistics", "economic analysis"],
    publicationCount: 28,
    relatedPublicationCount: 20,
    frequentContributor: false,
    status: "active"
  }
];

export const mockPublications: MockPublication[] = [
  {
    id: "1",
    title: "Minimum Wage Policy and Labor Market Outcomes in Vietnam",
    authors: ["Nguyễn Văn An", "Trần Thị Bình"],
    year: 2024,
    journal: "Vietnam Labor Review",
    publisher: "Ministry of Labor",
    doi: "10.1000/vlr.2024.001",
    abstract: "This study examines the impact of minimum wage increases on employment and wage distribution in Vietnam's manufacturing sector.",
    keywords: ["minimum wage", "labor market", "employment", "manufacturing"],
    scholarId: "1"
  },
  {
    id: "2",
    title: "Gender Equality in Vietnamese Workplaces: Progress and Challenges",
    authors: ["Trần Thị Bình", "Phạm Thị Dung"],
    year: 2024,
    journal: "Asian Labor Studies",
    publisher: "Asian Labor Research Network",
    doi: "10.1000/als.2024.002",
    abstract: "An analysis of gender equality policies and their implementation in Vietnamese workplaces over the past decade.",
    keywords: ["gender equality", "women workers", "workplace", "policy"],
    scholarId: "2"
  },
  {
    id: "3",
    title: "Collective Bargaining and Labor Relations in Vietnam's Export Industries",
    authors: ["Lê Minh Cường"],
    year: 2023,
    journal: "International Labor Law Review",
    publisher: "ILO Publications",
    doi: "10.1000/illr.2023.003",
    abstract: "This paper explores the development of collective bargaining mechanisms in Vietnam's export-oriented manufacturing sector.",
    keywords: ["collective bargaining", "labor relations", "export industries", "manufacturing"],
    scholarId: "3"
  },
  {
    id: "4",
    title: "Digital Transformation and Future of Work in Vietnam",
    authors: ["Phạm Thị Dung", "Vũ Thị Phương"],
    year: 2023,
    journal: "Technology and Society",
    publisher: "Tech Research Institute",
    doi: "10.1000/ts.2023.004",
    abstract: "An investigation into how digital technologies are reshaping work patterns and employment structures in Vietnam.",
    keywords: ["digital transformation", "future of work", "technology", "employment"],
    scholarId: "4"
  },
  {
    id: "5",
    title: "Green Jobs and Sustainable Development in Vietnam",
    authors: ["Hoàng Văn Em"],
    year: 2023,
    journal: "Environmental Economics",
    publisher: "Green Economics Society",
    doi: "10.1000/ee.2023.005",
    abstract: "This study maps the green jobs landscape in Vietnam and analyzes opportunities for sustainable employment growth.",
    keywords: ["green jobs", "sustainable development", "environment", "employment"],
    scholarId: "5"
  }
];

export const mockKeywords = [
  "labor law",
  "minimum wage",
  "labor relations",
  "occupational safety",
  "social insurance",
  "women workers",
  "collective bargaining",
  "labor dispute resolution",
  "labor market",
  "employment",
  "technology",
  "labor transformation",
  "sustainable development",
  "green jobs",
  "climate change",
  "environmental labor",
  "human resource management",
  "skills development",
  "vocational training",
  "talent development",
  "public policy",
  "employment policy",
  "labor governance",
  "policy analysis",
  "labor economics",
  "income inequality",
  "labor statistics",
  "economic analysis",
  "gender equality",
  "workplace",
  "policy",
  "export industries",
  "manufacturing",
  "digital transformation",
  "future of work",
  "environment",
  "green economics"
];
