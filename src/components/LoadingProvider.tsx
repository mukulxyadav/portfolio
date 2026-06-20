"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LoadingContextType {
  loading: boolean;
  progress: number;
  splineLoaded: boolean;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  setSplineLoaded: (loaded: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [splineLoaded, setSplineLoaded] = useState(false);

  // Fake progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading && !splineLoaded) {
      interval = setInterval(() => {
        setProgress((prev) => {
          // Slow down as it gets closer to 90%
          const step = prev < 50 ? 5 : prev < 80 ? 2 : 0.5;
          return prev >= 90 ? 90 : prev + step;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [loading, splineLoaded]);

  // Complete loading when Spline is loaded
  useEffect(() => {
    if (splineLoaded) {
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
    }
  }, [splineLoaded]);

  // Fallback: If loading takes longer than 8 seconds, force finish to avoid trapping users
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (loading) {
      timeout = setTimeout(() => {
        setProgress(100);
        setTimeout(() => setLoading(false), 500);
      }, 8000);
    }
    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <LoadingContext.Provider value={{ loading, progress, splineLoaded, setLoading, setProgress, setSplineLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
