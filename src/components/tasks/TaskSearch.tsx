'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useTaskStore from '@/store/useTaskStore';
import { useEffect, useState } from 'react';

export default function TaskSearch() {
  const { searchQuery, setSearchQuery } = useTaskStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [localQuery, setSearchQuery]);

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        type="text"
        placeholder="Search tasks..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="pl-9 pr-10 w-full bg-background"
      />
      {localQuery && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute inset-y-0 right-0 h-9 w-9 hover:bg-transparent"
          onClick={() => setLocalQuery('')}
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </Button>
      )}
    </div>
  );
}
