'use client';

import { useEffect, useState } from 'react';

interface LeetCodeStats {
  solved: number;
  easy: number;
  medium: number;
  hard: number;
  acceptance: number;
  ranking: number;
  topics?: string[];
}

interface UseLeetCodeStatsReturn {
  stats: LeetCodeStats | null;
  loading: boolean;
  error: boolean;
  lastUpdated: Date | null;
}

export function useLeetCodeStats(): UseLeetCodeStatsReturn {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch('/api/leetcode', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      
      // Add topics based on difficulty distribution
      const topics = [
        'Arrays',
        'Strings', 
        'Recursion',
        'Basic Data Structures',
      ];

      setStats({
        ...data,
        topics,
      });
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching LeetCode stats:', err);
      setError(true);
      // Stats will be null, component will use fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch on mount
    fetchStats();

    // Set up auto-refresh every 30 minutes
    const interval = setInterval(fetchStats, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return { stats, loading, error, lastUpdated };
}
