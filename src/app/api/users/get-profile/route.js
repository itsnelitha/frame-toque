import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const clerkId = searchParams.get('userId');

    if (!clerkId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Fetch user from database
    const users = await sql`
      SELECT 
        clerk_id, 
        email, 
        full_name, 
        phone, 
        company, 
        website, 
        bio
      FROM users 
      WHERE clerk_id = ${clerkId}
      LIMIT 1
    `;

    const user = users?.[0];

    if (!user) {
      return NextResponse.json({
        success: true,
        profile: null
      });
    }

    return NextResponse.json({
      success: true,
      profile: {
        phone: user.phone || '',
        company: user.company || '',
        website: user.website || '',
        bio: user.bio || '',
        fullName: user.full_name || '',
        email: user.email || '',
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch profile'
      },
      { status: 500 }
    );
  }
}