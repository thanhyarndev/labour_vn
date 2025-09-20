export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  authorId: string;
  category: 'new-scholar' | 'new-research' | 'event' | 'analysis' | 'announcement';
  tags: string[];
  featuredImageUrl?: string;
  readTime: number; // in minutes
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostInput {
  title: string;
  content: string;
  excerpt: string;
  authorId: string;
  category: 'new-scholar' | 'new-research' | 'event' | 'analysis' | 'announcement';
  tags: string[];
  featuredImageUrl?: string;
  readTime: number;
  isPublished?: boolean;
  isFeatured?: boolean;
  publishedAt?: Date;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  excerpt?: string;
  category?: 'new-scholar' | 'new-research' | 'event' | 'analysis' | 'announcement';
  tags?: string[];
  featuredImageUrl?: string;
  readTime?: number;
  isPublished?: boolean;
  isFeatured?: boolean;
  publishedAt?: Date;
}
