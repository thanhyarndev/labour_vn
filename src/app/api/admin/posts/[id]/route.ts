import { NextRequest, NextResponse } from 'next/server';
import { UpdatePostInput } from '@/models';
import { getPostById, updatePost, deletePost, mockPosts } from '@/lib/mockPostsData';

// GET /api/admin/posts/[id] - Lấy post theo ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = getPostById(id);
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/posts/[id] - Cập nhật post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: UpdatePostInput = await request.json();
    const existingPost = getPostById(id);
    
    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Generate new slug if title is updated
    let newSlug = existingPost.slug;
    if (body.title && body.title !== existingPost.title) {
      newSlug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      // Check if new slug already exists
      const slugExists = mockPosts.find(post => post.slug === newSlug && post.id !== id);
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'A post with this title already exists' },
          { status: 400 }
        );
      }
    }

    // Update post
    const updatedPost = updatePost(id, {
      ...body,
      slug: newSlug
    });

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, error: 'Failed to update post' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedPost
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/posts/[id] - Xóa post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = deletePost(id);
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
