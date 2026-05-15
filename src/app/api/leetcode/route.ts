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

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes for testing

async function fetchFromLeetCodeGraphQL(
  username: string
): Promise<LeetCodeStats | null> {
  try {
    console.log(`[LeetCode API] Fetching stats for username: ${username}`);
    
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            ranking
            reputation
            contributionPoints
          }
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
            totalSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
      }
    `;

    const response = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://leetcode.com/',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      signal: AbortSignal.timeout(8000), // 8 second timeout
    });

    if (!response.ok) {
      console.error(`[LeetCode API] GraphQL API responded with status ${response.status}`);
      return null;
    }

    const result = await response.json();

    if (result.errors) {
      console.error(`[LeetCode API] GraphQL errors:`, result.errors);
      return null;
    }

    if (!result.data || !result.data.matchedUser) {
      console.error(`[LeetCode API] No user data found for username: ${username}`);
      return null;
    }

    const user = result.data.matchedUser;
    const acSubmissions = user.submitStats.acSubmissionNum;
    
    // Parse submission counts by difficulty
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;
    let totalSolved = 0;

    acSubmissions.forEach((submission: any) => {
      if (submission.difficulty === 'Easy') {
        easySolved = submission.count;
      } else if (submission.difficulty === 'Medium') {
        mediumSolved = submission.count;
      } else if (submission.difficulty === 'Hard') {
        hardSolved = submission.count;
      }
    });

    totalSolved = easySolved + mediumSolved + hardSolved;

    // Calculate acceptance rate
    let totalAcceptance = 0;
    let totalAttempts = 0;

    acSubmissions.forEach((submission: any) => {
      totalAcceptance += submission.count * submission.submissions;
      totalAttempts += submission.submissions * submission.submissions;
    });

    const acceptance = totalAttempts > 0 ? (totalAcceptance / totalAttempts) * 100 : 0;

    const stats: LeetCodeStats = {
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      acceptance: Math.round(acceptance * 100) / 100,
      ranking: user.profile.ranking || 0,
      reputation: user.profile.reputation || 0,
      contributionPoints: user.profile.contributionPoints || 0,
    };

    console.log(`[LeetCode API] Successfully fetched data:`, stats);
    return stats;
  } catch (error) {
    console.error('[LeetCode API] Error fetching from LeetCode GraphQL API:', error);
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

    // Fetch fresh data from GraphQL
    const data = await fetchFromLeetCodeGraphQL(username);

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
          easySolved: 45,
          mediumSolved: 20,
          hardSolved: 9,
          acceptance: 42.5,
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
