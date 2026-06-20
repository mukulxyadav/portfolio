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

  // Fallback: If loading takes longer than 8 seconds, force finish to avoid trapping users
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (loading) {
      timeout = setTimeout(() => {
        setLoading(false);
        setProgress(100);
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
