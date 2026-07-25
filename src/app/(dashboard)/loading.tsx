import { Loader2 } from 'lucide-react';

export default function DashboardLoading() {
  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-muted-foreground animate-in fade-in duration-500">
        <Loader2 className="h-10 w-10 animate-spin text-primary/80" />
        <p className="text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}
