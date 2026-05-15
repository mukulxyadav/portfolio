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

const CACHE_TTL = 60 * 60 * 1000; // 1 hour

async function fetchFromLeetCode(
  username: string
): Promise<LeetCodeResponse | null> {
  try {
    // Using the public LeetCode stats API
    const response = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
        signal: AbortSignal.timeout(8000), // 8 second timeout
      }
    );

    if (!response.ok) {
      console.error(`LeetCode API responded with status ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data as LeetCodeResponse;
  } catch (error) {
    console.error('Error fetching from LeetCode API:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'mukulxyadav';

    // Check cache
    const now = Date.now();
    if (cachedData && now - cachedData.timestamp < CACHE_TTL) {
      return NextResponse.json(cachedData.data, {
        headers: {
          'Cache-Control': 'public, max-age=3600',
          'Content-Type': 'application/json',
        },
      });
    }

    // Fetch fresh data
    const data = await fetchFromLeetCode(username);

    if (!data) {
      // Return cached data if available, even if expired
      if (cachedData && cachedData.data) {
        return NextResponse.json(cachedData.data, {
          status: 200,
          headers: {
            'Cache-Control': 'public, max-age=300',
            'X-Cache': 'stale',
            'Content-Type': 'application/json',
          },
        });
      }

      // Fallback data if no cache
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
            'Cache-Control': 'public, max-age=300',
            'X-Cache': 'fallback',
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Update cache
    cachedData = {
      data,
      timestamp: now,
    };

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'X-Cache': 'fresh',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('API route error:', error);

    // Return cached data if available
    if (cachedData && cachedData.data) {
      return NextResponse.json(cachedData.data, {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=300',
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
