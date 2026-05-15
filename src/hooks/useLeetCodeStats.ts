'use client';

import { useEffect, useState } from 'react';
import { LeetCodeStats } from '../data/resume';

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
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      
      // Map API response to our stats format
      const topics = [
        'Arrays',
        'Strings', 
        'Recursion',
        'Basic Data Structures',
      ];

      // Handle both camelCase and snake_case responses
      const mappedStats: LeetCodeStats = {
        solved: data.solved || data.totalSolved || 0,
        easySolved: data.easySolved || data.easy || 0,
        mediumSolved: data.mediumSolved || data.medium || 0,
        hardSolved: data.hardSolved || data.hard || 0,
        ranking: data.ranking || 0,
        topics,
      };

      console.log('Fetched LeetCode stats:', mappedStats);
      setStats(mappedStats);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching LeetCode stats:', err);
      setError(true);
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
