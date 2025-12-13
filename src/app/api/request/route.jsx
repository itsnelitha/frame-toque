// app/api/requests/route.js
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Initialize database connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET(request) {
  console.log('API Route: /api/requests called');
  
  try {
    const { searchParams } = new URL(request.url);
    const clerk_id = searchParams.get('clerk_id');
    
    console.log('Query param clerk_id:', clerk_id);
    
    if (!clerk_id) {
      return NextResponse.json(
        { error: 'clerk_id is required' },
        { status: 400 }
      );
    }

    // First, let's test the database connection
    console.log('Testing database connection...');
    
    // Simple test query
    const testQuery = await pool.query('SELECT NOW()');
    console.log('Database connection test successful:', testQuery.rows[0]);
    
    // Check if clerk_id column exists
    console.log('Checking table structure...');
    const tableInfo = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'projects'
    `);
    console.log('Available columns:', tableInfo.rows.map(r => r.column_name));
    
    // Modified query - first check if clerk_id column exists
    // If not, fall back to user_email or return empty array
    const columns = tableInfo.rows.map(r => r.column_name);
    
    let query;
    let params;
    
    if (columns.includes('clerk_id')) {
      console.log('Using clerk_id column');
      query = `SELECT * FROM projects WHERE clerk_id = $1 ORDER BY submitted_at DESC`;
      params = [clerk_id];
    } else if (columns.includes('user_email')) {
      console.log('clerk_id column not found, trying to get email from users table');
      
      // You might need to get the email first from a users table
      // For now, return mock data or empty array
      console.log('Returning empty array - no clerk_id column found');
      return NextResponse.json([]);
    } else {
      console.log('No user identifier column found');
      return NextResponse.json([]);
    }
    
    const result = await pool.query(query, params);
    console.log(`Found ${result.rows.length} requests`);
    
    return NextResponse.json(result.rows);
    
  } catch (error) {
    console.error('Database error:', error);
    
    // Return mock data for testing
    console.log('Returning mock data due to error');
    const mockData = [
      {
        id: 1,
        title: "Web Development - Standard",
        request_id: "REQ-001",
        submitted_at: "2025-01-15T00:00:00.000Z",
        status: "in-progress",
        progress: 60,
        type: "Web Development",
        description: "Standard web development package"
      },
      {
        id: 2,
        title: "Graphics Design - Basic",
        request_id: "REQ-002",
        submitted_at: "2025-01-10T00:00:00.000Z",
        status: "completed",
        progress: 100,
        type: "Graphics Design",
        description: "Basic graphics design package"
      }
    ];
    
    return NextResponse.json(mockData);
  }
}