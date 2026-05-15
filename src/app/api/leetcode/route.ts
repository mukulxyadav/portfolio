import { NextRequest, NextResponse } from 'next/server';

interface LeetCodeResponse {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  acceptance: number;
  ranking: number;
  contributionPoint: number;
  reputation: number;
  streak: number;
}

// In-memory cache with TTL
let cachedData: {
  data: LeetCodeResponse | null;
  timestamp: number;
} | null = null;

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes for testing

async function fetchFromLeetCode(
  username: string
): Promise<LeetCodeResponse | null> {
  try {
    console.log(`[LeetCode API] Fetching stats for username: ${username}`);
    
    // Using the public LeetCode stats API
    const response = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        signal: AbortSignal.timeout(8000), // 8 second timeout
      }
    );

    if (!response.ok) {
      console.error(`[LeetCode API] API responded with status ${response.status}`);
      return null;
    }

    const data = await response.json();
    console.log(`[LeetCode API] Successfully fetched data:`, data);
    return data as LeetCodeResponse;
  } catch (error) {
    console.error('[LeetCode API] Error fetching from LeetCode API:', error);
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

    // Fetch fresh data
    const data = await fetchFromLeetCode(username);

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
          totalSolved: 74,
          totalQuestions: 2850,
          easySolved: 45,
          easyTotal: 875,
          mediumSolved: 20,
          mediumTotal: 1282,
          hardSolved: 9,
          hardTotal: 693,
          acceptance: 42.5,
          ranking: 0,
          contributionPoint: 0,
          reputation: 0,
          streak: 0,
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
