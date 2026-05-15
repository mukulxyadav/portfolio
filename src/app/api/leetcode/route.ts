import { NextRequest, NextResponse } from 'next/server';

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptance: number;
  ranking: number;
  reputation: number;
  contributionPoints: number;
}

// In-memory cache with TTL
let cachedData: {
  data: LeetCodeStats | null;
  timestamp: number;
} | null = null;

const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

async function fetchFromLeetCodeAPI(
  username: string
): Promise<LeetCodeStats | null> {
  try {
    console.log(`[LeetCode API] Fetching stats for username: ${username} using Alfa API`);
    
    // Using alfa-leetcode-api which is generally more reliable than direct GraphQL
    const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      console.error(`[LeetCode API] Alfa API responded with status ${response.status}`);
      return null;
    }

    const data = await response.json();

    const stats: LeetCodeStats = {
      totalSolved: data.solvedProblem || 0,
      easySolved: data.easySolved || 0,
      mediumSolved: data.mediumSolved || 0,
      hardSolved: data.hardSolved || 0,
      acceptance: 0, // Alfa API doesn't provide this in /solved
      ranking: data.ranking || 0,
      reputation: 0,
      contributionPoints: 0,
    };

    console.log(`[LeetCode API] Successfully fetched data:`, stats);
    return stats;
  } catch (error) {
    console.error('[LeetCode API] Error fetching from LeetCode Alfa API:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'mukulxyadav';

    console.log(`[LeetCode API] GET request received for username: ${username}`);

    // Check cache
    const now = Date.now();
    if (cachedData && now - cachedData.timestamp < CACHE_TTL) {
      console.log(`[LeetCode API] Cache hit - returning cached data`);
      return NextResponse.json(cachedData.data, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
          'X-Cache': 'hit',
        },
      });
    }

    console.log(`[LeetCode API] Cache miss or expired, fetching fresh data`);

    // Fetch fresh data from API
    const data = await fetchFromLeetCodeAPI(username);

    if (!data) {
      console.log(`[LeetCode API] No fresh data, checking for stale cache`);
      
      // Return cached data if available, even if expired
      if (cachedData && cachedData.data) {
        console.log(`[LeetCode API] Returning stale cache`);
        return NextResponse.json(cachedData.data, {
          status: 200,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'X-Cache': 'stale',
            'Content-Type': 'application/json',
          },
        });
      }

      // Fallback data if no cache
      console.log(`[LeetCode API] No cache available, returning fallback data`);
      return NextResponse.json(
        {
          totalSolved: 76,
          easySolved: 33,
          mediumSolved: 39,
          hardSolved: 4,
          acceptance: 0,
          ranking: 0,
          reputation: 0,
          contributionPoints: 0,
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'X-Cache': 'fallback',
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Update cache
    console.log(`[LeetCode API] Updating cache with fresh data`);
    cachedData = {
      data,
      timestamp: now,
    };

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Cache': 'fresh',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('[LeetCode API] API route error:', error);

    // Return cached data if available
    if (cachedData && cachedData.data) {
      console.log(`[LeetCode API] Error occurred, returning cached data`);
      return NextResponse.json(cachedData.data, {
        status: 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Cache': 'error-fallback',
        },
      });
    }

    return NextResponse.json(
      { error: 'Failed to fetch LeetCode stats' },
      { status: 500 }
    );
  }
}
