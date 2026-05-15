import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Using alfa-leetcode-api which is generally more reliable
    const response = await fetch('https://alfa-leetcode-api.onrender.com/mukulxyadav/solved', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from LeetCode API');
    }

    const data = await response.json();

    return NextResponse.json({
      solved: data.solvedProblem || 0,
      easySolved: data.easySolved || 0,
      mediumSolved: data.mediumSolved || 0,
      hardSolved: data.hardSolved || 0,
      ranking: data.ranking || 0
    });
  } catch (error) {
    console.error('LeetCode API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch LeetCode data' },
      { status: 500 }
    );
  }
}
