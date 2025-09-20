export interface MockPublication {
  id: string;
  title: string;
  year: number;
  authors: string[];
  journal?: string;
  publisher?: string;
  citations: number;
  doi?: string;
  url?: string;
  type: "journal" | "conference" | "book" | "report" | "other";
  abstract?: string;
  quote?: string; // Key quote or excerpt from the publication
}

export interface MockProject {
  id: string;
  title: string;
  description: string;
  startYear: number;
  endYear?: number;
  funding?: string;
  role: string;
  status: "ongoing" | "completed" | "planned";
}

export interface MockService {
  id: string;
  title: string;
  organization: string;
  year: number;
  type: "editorial" | "review" | "consultation" | "committee" | "other";
  description?: string;
}

export interface MockScholar {
  id: string;
  fullName: string;
  familyName?: string;
  givenName?: string;
  affiliation: string;
  position: string;
  email?: string;
  bio?: string;
  avatarUrl?: string;
  keywords: string[];
  publicationCount: number;
  frequentContributor: boolean;
  slug: string;
  googleScholarUrl?: string;
  institutionalProfileUrl?: string;
  homepageUrl?: string;
  orcid?: string;
  selectedPublications: MockPublication[];
  currentProjects: MockProject[];
  services: MockService[];
  consulting?: string;
  funding?: string;
}

export const mockScholars: MockScholar[] = [
  {
    id: "1",
    fullName: "Nguyễn Văn An",
    familyName: "Nguyễn",
    givenName: "Văn An",
    affiliation: "Đại học Kinh tế Quốc dân",
    position: "Giáo sư, Trưởng khoa Luật",
    email: "nguyen.van.an@neu.edu.vn",
    bio: "Chuyên gia về luật lao động Việt Nam với hơn 20 năm kinh nghiệm nghiên cứu và giảng dạy. Tác giả của nhiều công trình nghiên cứu về quan hệ lao động và bảo hiểm xã hội.",
    keywords: ["Labor Law", "Labor Relations", "Social Insurance", "Collective Bargaining"],
    publicationCount: 45,
    frequentContributor: true,
    slug: "nguyen-van-an",
    googleScholarUrl: "https://scholar.google.com/citations?user=example1",
    institutionalProfileUrl: "https://neu.edu.vn/faculty/nguyen-van-an",
    homepageUrl: "https://nguyenvanan.academia.edu",
    orcid: "0000-0000-0000-0001",
    selectedPublications: [
      {
        id: "pub1",
        title: "Labor Law Reform in Vietnam: Challenges and Opportunities",
        year: 2023,
        authors: ["Nguyễn Văn An", "Trần Thị Bình"],
        journal: "Asian Journal of Law and Society",
        citations: 15,
        doi: "10.1017/als.2023.123",
        type: "journal"
      },
      {
        id: "pub2",
        title: "Social Insurance Policy and Labor Rights in Vietnam",
        year: 2022,
        authors: ["Nguyễn Văn An"],
        journal: "International Labor Review",
        citations: 28,
        doi: "10.1111/ilr.2022.456",
        type: "journal"
      },
      {
        id: "pub3",
        title: "Collective Bargaining in Vietnamese Enterprises",
        year: 2021,
        authors: ["Nguyễn Văn An", "Lê Minh Cường"],
        publisher: "Vietnam National University Press",
        citations: 42,
        type: "book"
      }
    ],
    currentProjects: [
      {
        id: "proj1",
        title: "Digital Transformation and Labor Relations in Vietnam",
        description: "Research project examining the impact of digitalization on traditional labor relations and collective bargaining mechanisms.",
        startYear: 2023,
        endYear: 2025,
        funding: "Vietnam National Foundation for Science and Technology Development (NAFOSTED)",
        role: "Principal Investigator",
        status: "ongoing"
      },
      {
        id: "proj2",
        title: "Comparative Study of Labor Law in ASEAN Countries",
        description: "Collaborative research with universities in Thailand, Malaysia, and Singapore on labor law harmonization.",
        startYear: 2022,
        endYear: 2024,
        funding: "ASEAN University Network",
        role: "Co-Investigator",
        status: "ongoing"
      }
    ],
    services: [
      {
        id: "serv1",
        title: "Editorial Board Member",
        organization: "Vietnam Journal of Labor and Social Affairs",
        year: 2020,
        type: "editorial",
        description: "Reviewing manuscripts on labor law and social policy"
      },
      {
        id: "serv2",
        title: "Policy Consultant",
        organization: "Ministry of Labor, Invalids and Social Affairs",
        year: 2021,
        type: "consultation",
        description: "Advising on labor law amendments and social insurance reforms"
      },
      {
        id: "serv3",
        title: "Peer Reviewer",
        organization: "International Labor Review, Asian Journal of Law and Society",
        year: 2019,
        type: "review"
      }
    ],
    consulting: "Policy consultation for government agencies on labor law reforms and social insurance policy development. Expert witness in labor dispute cases.",
    funding: "Principal Investigator on 3 NAFOSTED grants (2020-2025), Co-Investigator on 2 international collaborative projects"
  },
  {
    id: "2",
    fullName: "Trần Thị Bình",
    familyName: "Trần",
    givenName: "Thị Bình",
    affiliation: "Viện Khoa học Lao động và Xã hội",
    position: "Phó Giáo sư, Phó Viện trưởng",
    email: "tran.thi.binh@molisa.gov.vn",
    bio: "Nghiên cứu viên cao cấp chuyên về chính sách lao động và an toàn lao động. Có nhiều công trình nghiên cứu về lao động nữ và bảo vệ quyền lợi người lao động.",
    keywords: ["Labor Policy", "Occupational Safety", "Women Workers", "Labor Rights"],
    publicationCount: 32,
    frequentContributor: true,
    slug: "tran-thi-binh",
    googleScholarUrl: "https://scholar.google.com/citations?user=example2",
    institutionalProfileUrl: "https://molisa.gov.vn/researchers/tran-thi-binh",
    orcid: "0000-0000-0000-0002",
    selectedPublications: [
      {
        id: "pub4",
        title: "Women Workers in Vietnam's Manufacturing Sector: Rights and Challenges",
        year: 2023,
        authors: ["Trần Thị Bình"],
        journal: "Gender, Work & Organization",
        citations: 22,
        doi: "10.1111/gwo.2023.789",
        type: "journal"
      },
      {
        id: "pub5",
        title: "Occupational Safety and Health in Vietnamese Factories",
        year: 2022,
        authors: ["Trần Thị Bình", "Phạm Thị Dung"],
        journal: "Safety Science",
        citations: 18,
        doi: "10.1016/j.ssci.2022.456",
        type: "journal"
      }
    ],
    currentProjects: [
      {
        id: "proj3",
        title: "Gender Equality in Vietnamese Labor Market",
        description: "Comprehensive study on gender disparities in employment, wages, and career advancement opportunities.",
        startYear: 2022,
        endYear: 2024,
        funding: "UN Women Vietnam",
        role: "Principal Investigator",
        status: "ongoing"
      }
    ],
    services: [
      {
        id: "serv4",
        title: "Policy Advisor",
        organization: "Vietnam General Confederation of Labour",
        year: 2021,
        type: "consultation",
        description: "Advising on women workers' rights and occupational safety policies"
      }
    ],
    consulting: "Expert consultation on gender equality policies and occupational safety standards for government agencies and international organizations.",
    funding: "Principal Investigator on 2 UN Women grants, Co-Investigator on 1 ILO research project"
  },
  {
    id: "3",
    fullName: "Lê Minh Cường",
    familyName: "Lê",
    givenName: "Minh Cường",
    affiliation: "Đại học Luật Hà Nội",
    position: "Tiến sĩ, Giảng viên cao cấp",
    email: "le.minh.cuong@hlu.edu.vn",
    bio: "Chuyên gia về giải quyết tranh chấp lao động và đối thoại xã hội. Có kinh nghiệm thực tiễn trong việc tư vấn cho các doanh nghiệp về quan hệ lao động.",
    keywords: ["Labor Dispute Resolution", "Social Dialogue", "Labor Law", "Industrial Relations"],
    publicationCount: 28,
    frequentContributor: true,
    slug: "le-minh-cuong",
    googleScholarUrl: "https://scholar.google.com/citations?user=example3",
    institutionalProfileUrl: "https://hlu.edu.vn/faculty/le-minh-cuong",
    orcid: "0000-0000-0000-0003",
    selectedPublications: [],
    currentProjects: [],
    services: [],
    consulting: "Labor dispute mediation and consultation for enterprises on industrial relations management.",
    funding: "Principal Investigator on 1 NAFOSTED grant, Co-Investigator on 1 international project"
  },
  {
    id: "4",
    fullName: "Phạm Thị Dung",
    familyName: "Phạm",
    givenName: "Thị Dung",
    affiliation: "Đại học Kinh tế TP.HCM",
    position: "Tiến sĩ, Giảng viên",
    email: "pham.thi.dung@ueh.edu.vn",
    bio: "Nghiên cứu về lao động di cư và thị trường lao động. Có nhiều công trình về tác động của toàn cầu hóa đến quan hệ lao động Việt Nam.",
    keywords: ["Labor Migration", "Labor Market", "Globalization", "Labor Economics"],
    publicationCount: 18,
    frequentContributor: false,
    slug: "pham-thi-dung",
    googleScholarUrl: "https://scholar.google.com/citations?user=example4",
    institutionalProfileUrl: "https://ueh.edu.vn/faculty/pham-thi-dung",
    orcid: "0000-0000-0000-0004",
    selectedPublications: [
      {
        id: "pub6",
        title: "Labor Migration Patterns in Vietnam: A Decade of Change",
        year: 2023,
        authors: ["Phạm Thị Dung"],
        journal: "Asian Population Studies",
        citations: 8,
        doi: "10.1080/17441730.2023.123456",
        type: "journal",
        quote: "The study reveals that internal migration in Vietnam has shifted from rural-to-urban patterns to more complex multi-directional flows, significantly impacting labor market dynamics and social structures."
      },
      {
        id: "pub7",
        title: "Globalization and Labor Market Transformation in Vietnam",
        year: 2022,
        authors: ["Phạm Thị Dung", "Nguyễn Văn An"],
        journal: "International Migration Review",
        citations: 12,
        doi: "10.1177/01979183221123456",
        type: "journal",
        quote: "Our findings suggest that globalization has created both opportunities and challenges for Vietnamese workers, with significant variations across different sectors and regions."
      }
    ],
    currentProjects: [],
    services: [],
    consulting: "Research consultation on labor migration and market dynamics for international organizations.",
    funding: "Co-Investigator on 2 international research projects"
  },
  {
    id: "5",
    fullName: "Hoàng Văn Em",
    familyName: "Hoàng",
    givenName: "Văn Em",
    affiliation: "Viện Nghiên cứu Kinh tế và Chính sách",
    position: "Nghiên cứu viên",
    email: "hoang.van.em@vepr.org.vn",
    bio: "Chuyên gia về chính sách tiền lương tối thiểu và bảo hiểm xã hội. Có kinh nghiệm nghiên cứu về tác động của chính sách lao động đến nền kinh tế.",
    keywords: ["Minimum Wage", "Social Insurance", "Labor Policy", "Economic Impact"],
    publicationCount: 12,
    frequentContributor: false,
    slug: "hoang-van-em",
    googleScholarUrl: "https://scholar.google.com/citations?user=example5",
    institutionalProfileUrl: "https://vepr.org.vn/researchers/hoang-van-em",
    orcid: "0000-0000-0000-0005",
    selectedPublications: [
      {
        id: "pub8",
        title: "Minimum Wage Policy and Economic Impact in Vietnam",
        year: 2023,
        authors: ["Hoàng Văn Em"],
        journal: "Vietnam Economic Review",
        citations: 5,
        doi: "10.15678/VER.2023.123456",
        type: "journal",
        quote: "The analysis demonstrates that minimum wage increases in Vietnam have had mixed effects on employment, with positive impacts on worker welfare but potential negative effects on small and medium enterprises."
      }
    ],
    currentProjects: [],
    services: [],
    consulting: "Economic policy analysis and consultation on minimum wage and social insurance reforms.",
    funding: "Research Associate on 1 VEPR research project"
  },
  {
    id: "6",
    fullName: "Vũ Thị Phương",
    familyName: "Vũ",
    givenName: "Thị Phương",
    affiliation: "Đại học Lao động - Xã hội",
    position: "Tiến sĩ, Trưởng bộ môn",
    email: "vu.thi.phuong@ulss.edu.vn",
    bio: "Chuyên gia về lao động trẻ em và bảo vệ quyền lợi lao động. Có nhiều nghiên cứu về tình hình lao động trong các khu công nghiệp.",
    keywords: ["Child Labor", "Labor Rights", "Industrial Zones", "Labor Protection"],
    publicationCount: 22,
    frequentContributor: true,
    slug: "vu-thi-phuong",
    googleScholarUrl: "https://scholar.google.com/citations?user=example6",
    institutionalProfileUrl: "https://ulss.edu.vn/faculty/vu-thi-phuong",
    orcid: "0000-0000-0000-0006",
    selectedPublications: [],
    currentProjects: [],
    services: [],
    consulting: "Expert consultation on child labor prevention and labor rights protection for NGOs and government agencies.",
    funding: "Principal Investigator on 1 UNICEF grant, Co-Investigator on 1 ILO project"
  },
  {
    id: "7",
    fullName: "Đặng Văn Giang",
    familyName: "Đặng",
    givenName: "Văn Giang",
    affiliation: "Trường Đại học Kinh tế - Luật",
    position: "Phó Giáo sư",
    email: "dang.van.giang@uel.edu.vn",
    bio: "Nghiên cứu về công đoàn và đối thoại xã hội. Có kinh nghiệm thực tiễn trong việc xây dựng quan hệ lao động hài hòa.",
    keywords: ["Trade Unions", "Social Dialogue", "Labor Relations", "Industrial Democracy"],
    publicationCount: 35,
    frequentContributor: true,
    slug: "dang-van-giang",
    googleScholarUrl: "https://scholar.google.com/citations?user=example7",
    institutionalProfileUrl: "https://uel.edu.vn/faculty/dang-van-giang",
    orcid: "0000-0000-0000-0007",
    selectedPublications: [],
    currentProjects: [],
    services: [],
    consulting: "Consultation on trade union development and social dialogue mechanisms for labor organizations.",
    funding: "Principal Investigator on 2 NAFOSTED grants, Co-Investigator on 1 international project"
  },
  {
    id: "8",
    fullName: "Bùi Thị Hoa",
    familyName: "Bùi",
    givenName: "Thị Hoa",
    affiliation: "Viện Khoa học Xã hội Việt Nam",
    position: "Nghiên cứu viên cao cấp",
    email: "bui.thi.hoa@vass.gov.vn",
    bio: "Chuyên gia về lao động nông thôn và chuyển đổi cơ cấu lao động. Có nhiều công trình nghiên cứu về tác động của đô thị hóa đến lao động nông thôn.",
    keywords: ["Rural Labor", "Labor Transition", "Urbanization", "Agricultural Labor"],
    publicationCount: 15,
    frequentContributor: false,
    slug: "bui-thi-hoa",
    googleScholarUrl: "https://scholar.google.com/citations?user=example8",
    institutionalProfileUrl: "https://vass.gov.vn/researchers/bui-thi-hoa",
    orcid: "0000-0000-0000-0008",
    selectedPublications: [
      {
        id: "pub9",
        title: "Rural Labor Transition in Vietnam's Agricultural Sector",
        year: 2022,
        authors: ["Bùi Thị Hoa"],
        journal: "Journal of Rural Studies",
        citations: 7,
        doi: "10.1016/j.jrurstud.2022.123456",
        type: "journal",
        quote: "Urbanization has created new opportunities for rural workers, but also challenges traditional agricultural labor patterns and community structures in Vietnam's countryside."
      },
      {
        id: "pub10",
        title: "Agricultural Labor and Economic Development in Vietnam",
        year: 2021,
        authors: ["Bùi Thị Hoa", "Trần Thị Bình"],
        journal: "Asian Development Review",
        citations: 9,
        doi: "10.1162/adev_a_00123",
        type: "journal",
        quote: "The transformation of agricultural labor in Vietnam reflects broader economic changes, with implications for rural development policies and social welfare programs."
      }
    ],
    currentProjects: [],
    services: [],
    consulting: "Research consultation on rural labor and agricultural development for government agencies and international organizations.",
    funding: "Research Associate on 1 VASS research project, Co-Investigator on 1 international project"
  }
];

export const mockKeywords = [
  "Labor Law",
  "Labor Relations", 
  "Minimum Wage",
  "Occupational Safety",
  "Social Insurance",
  "Collective Bargaining",
  "Labor Dispute Resolution",
  "Women Workers",
  "Child Labor",
  "Trade Unions",
  "Labor Policy",
  "Labor Rights",
  "Labor Migration",
  "Labor Market",
  "Globalization",
  "Labor Economics",
  "Economic Impact",
  "Industrial Zones",
  "Labor Protection",
  "Social Dialogue",
  "Industrial Democracy",
  "Rural Labor",
  "Labor Transition",
  "Urbanization",
  "Agricultural Labor"
];

export const searchScholars = (query: string): MockScholar[] => {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return mockScholars.filter(scholar => 
    scholar.fullName.toLowerCase().includes(lowercaseQuery) ||
    scholar.affiliation.toLowerCase().includes(lowercaseQuery) ||
    scholar.position.toLowerCase().includes(lowercaseQuery) ||
    scholar.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
};

export const getFrequentContributors = (): MockScholar[] => {
  return mockScholars.filter(scholar => scholar.frequentContributor);
};

export const getOccasionalContributors = (): MockScholar[] => {
  return mockScholars.filter(scholar => !scholar.frequentContributor);
};

export const getScholarBySlug = (slug: string): MockScholar | undefined => {
  return mockScholars.find(scholar => scholar.slug === slug);
};
