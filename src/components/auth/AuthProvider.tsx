'use client';

import { useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { fetchUser, isLoading } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-lg bg-primary/20 mb-4 flex items-center justify-center">
            <div className="h-6 w-6 rounded-sm bg-primary/50 animate-bounce" />
          </div>
          <div className="h-4 w-32 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
