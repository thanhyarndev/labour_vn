import { NextRequest, NextResponse } from 'next/server';
import { CreatePostInput } from '@/models';
import { mockPosts, createPost, searchPosts } from '@/lib/mockPostsData';

// GET /api/admin/posts - Lấy danh sách posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const status = searchParams.get('status'); // published, draft, all

    const filteredPosts = searchPosts(search || '', category || 'all', status || 'all');

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        posts: paginatedPosts,
        pagination: {
          page,
          limit,
          total: filteredPosts.length,
          totalPages: Math.ceil(filteredPosts.length / limit)
        }
      }
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/admin/posts - Tạo post mới
export async function POST(request: NextRequest) {
  try {
    const body: CreatePostInput = await request.json();
    
    // Validation
    if (!body.title || !body.content || !body.authorId) {
      return NextResponse.json(
        { success: false, error: 'Title, content, and authorId are required' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Check if slug already exists
    const existingPost = mockPosts.find(post => post.slug === slug);
    if (existingPost) {
      return NextResponse.json(
        { success: false, error: 'A post with this title already exists' },
        { status: 400 }
      );
    }

    const newPost = createPost({
      slug,
      title: body.title,
      content: body.content,
      excerpt: body.excerpt || body.content.substring(0, 150) + '...',
      authorId: body.authorId,
      category: body.category,
      tags: body.tags || [],
      featuredImageUrl: body.featuredImageUrl,
      readTime: body.readTime || Math.ceil(body.content.split(' ').length / 200),
      isPublished: body.isPublished || false,
      isFeatured: body.isFeatured || false,
      publishedAt: body.publishedAt
    });

    return NextResponse.json({
      success: true,
      data: newPost
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
