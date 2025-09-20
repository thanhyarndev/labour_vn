import { Post } from "@/models";

// Shared mock data for posts - used by all API endpoints
export const mockPosts: Post[] = [
  {
    id: '1',
    slug: 'welcome-to-vietnam-labour-research-portal',
    title: 'Welcome to Vietnam Labour Research Portal',
    content: 'This is the first post on our portal. We are excited to share the latest research and insights about labor studies in Vietnam.',
    excerpt: 'Introduction to the Vietnam Labour Research Portal',
    authorId: 'admin-1',
    category: 'announcement',
    tags: ['welcome', 'introduction'],
    featuredImageUrl: '/images/portal-intro.jpg',
    readTime: 3,
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    slug: 'new-research-on-vietnamese-migrant-workers',
    title: 'New Research on Vietnamese Migrant Workers',
    content: 'Recent studies have shown significant trends in Vietnamese migrant worker patterns. This research examines the economic and social impacts of migration on both sending and receiving communities.',
    excerpt: 'Latest findings on Vietnamese migrant worker patterns and their economic impacts',
    authorId: 'admin-1',
    category: 'new-research',
    tags: ['migration', 'workers', 'research'],
    featuredImageUrl: '/images/migrant-workers.jpg',
    readTime: 5,
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2024-01-20'),
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    slug: 'upcoming-conference-on-labor-rights',
    title: 'Upcoming Conference on Labor Rights',
    content: 'Join us for the annual conference on labor rights in Southeast Asia. This year we will focus on digitalization and its impact on worker protections.',
    excerpt: 'Annual conference focusing on labor rights and digitalization in Southeast Asia',
    authorId: 'admin-1',
    category: 'event',
    tags: ['conference', 'labor-rights', 'southeast-asia'],
    featuredImageUrl: '/images/conference.jpg',
    readTime: 2,
    isPublished: false,
    isFeatured: false,
    publishedAt: undefined,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  }
];

// Helper functions
export const getPostById = (id: string): Post | undefined => {
  return mockPosts.find(post => post.id === id);
};

export const createPost = (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post => {
  const newPost: Post = {
    ...postData,
    id: (mockPosts.length + 1).toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  mockPosts.push(newPost);
  return newPost;
};

export const updatePost = (id: string, updates: Partial<Post>): Post | null => {
  const index = mockPosts.findIndex(post => post.id === id);
  if (index === -1) return null;
  
  mockPosts[index] = {
    ...mockPosts[index],
    ...updates,
    updatedAt: new Date()
  };
  return mockPosts[index];
};

export const deletePost = (id: string): boolean => {
  const index = mockPosts.findIndex(post => post.id === id);
  if (index === -1) return false;
  
  mockPosts.splice(index, 1);
  return true;
};

export const searchPosts = (query: string, category?: string, status?: string): Post[] => {
  let filteredPosts = [...mockPosts];

  // Filter by search query
  if (query) {
    const searchLower = query.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Filter by category
  if (category && category !== 'all') {
    filteredPosts = filteredPosts.filter(post => post.category === category);
  }

  // Filter by status
  if (status === 'published') {
    filteredPosts = filteredPosts.filter(post => post.isPublished);
  } else if (status === 'draft') {
    filteredPosts = filteredPosts.filter(post => !post.isPublished);
  }

  return filteredPosts;
};
