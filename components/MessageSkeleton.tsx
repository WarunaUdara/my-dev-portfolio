export function MessageSkeleton() {
  return (
    <div className="rounded-xl bg-zinc-900/50 border border-white/10 p-5 animate-pulse">
      <div className="flex items-start gap-4">
        {/* Avatar skeleton */}
        <div className="w-12 h-12 rounded-full bg-zinc-800 flex-shrink-0" />
        
        <div className="flex-1 space-y-3">
          {/* Name and timestamp */}
          <div className="flex items-center gap-3">
            <div className="h-4 bg-zinc-800 rounded w-32" />
            <div className="h-3 bg-zinc-800 rounded w-24" />
          </div>
          
          {/* Message lines */}
          <div className="space-y-2">
            <div className="h-4 bg-zinc-800 rounded w-full" />
            <div className="h-4 bg-zinc-800 rounded w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
