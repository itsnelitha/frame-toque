import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { clerkId, email, fullName, phone, company, website, bio } = body;

    if (!clerkId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // First, check if user exists
    const existingUsers = await sql`
      SELECT id FROM users WHERE clerk_id = ${clerkId}
      LIMIT 1
    `;

    let result;
    
    if (existingUsers.length > 0) {
      // Update existing user
      result = await sql`
        UPDATE users 
        SET 
          email = ${email},
          full_name = ${fullName || ''},
          phone = ${phone || null},
          company = ${company || null},
          website = ${website || null},
          bio = ${bio || null},
          updated_at = NOW()
        WHERE clerk_id = ${clerkId}
        RETURNING 
          clerk_id, 
          email, 
          full_name, 
          phone, 
          company, 
          website, 
          bio
      `;
    } else {
      // Insert new user
      result = await sql`
        INSERT INTO users (
          clerk_id, 
          email, 
          full_name, 
          phone, 
          company, 
          website, 
          bio,
          created_at,
          updated_at
        ) VALUES (
          ${clerkId}, 
          ${email}, 
          ${fullName || ''}, 
          ${phone || null}, 
          ${company || null}, 
          ${website || null}, 
          ${bio || null},
          NOW(),
          NOW()
        )
        RETURNING 
          clerk_id, 
          email, 
          full_name, 
          phone, 
          company, 
          website, 
          bio
      `;
    }

    const savedUser = result[0];

    return NextResponse.json({
      success: true,
      profile: {
        phone: savedUser.phone || '',
        company: savedUser.company || '',
        website: savedUser.website || '',
        bio: savedUser.bio || '',
        fullName: savedUser.full_name || '',
        email: savedUser.email || '',
      }
    });

  } catch (error) {
    console.error('Save profile error:', error);
    
    // Handle specific error cases
    if (error.code === '23505' || error.message?.includes('unique constraint')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'This email is already associated with another account' 
        },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to save profile'
      },
      { status: 500 }
    );
  }
}