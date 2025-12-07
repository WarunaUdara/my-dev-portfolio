"use client";
import React from 'react';
import { cn } from '@/lib/utils';

interface BucketItem {
  id: number;
  text: string;
  completed: boolean;
  date?: string;
  link?: string;

}

const bucketItems: BucketItem[] = [
    { id: 1, text: "Skydiving", completed: false },
    { id: 2, text: "Find my first job", completed: false },
    { id: 3, text: "Solo travel to another country", completed: true },
    { id: 4, text: "Create portfolio website", completed: true,  link: "https://warunadev.vercel.app/" },
    { id: 5, text: "Certified Kubernetes Administrator", completed: false },
    { id: 6, text: "Parents trip to india", completed: false },
    { id: 7, text: "Remote working with client from abroad", completed: false },
    { id: 8, text: "Certified AWS Solutions Architect Associate", completed: false, date: "2026" },
    { id: 9, text: "Write 10 articles", completed: false, date: "4/10 done" },
    { id: 10, text: "Get 1,000 organic LinkedIn followers", completed: true, date: "May 2023" },
    { id: 11, text: "Organize or Co-Host a Tech Event", completed: true },
    { id: 12, text: "University degree", completed: true },
    { id: 13, text: "Sport Car", completed: false },
    { id: 14, text: "Hike a mountain", completed: true },
    { id: 15, text: "Do 10 CSR activities", completed: true , date: "4/10 done | 2 pending"},
    { id: 16, text: "Teach coding to 100 students", completed: true },
    { id: 17, text: "Speak infront of 100 people", completed: true },
    { id: 18, text: "Speak infront of 1000 people", completed: false },
    { id: 19, text: "Solo hike", completed: false },
    { id: 20, text: "Participate in Hackathons", completed: true },
    { id: 21, text: "First client project", completed: true },
   
    

    
];

const BucketList = () => {
  const completedCount = bucketItems.filter(item => item.completed).length;
  const totalCount = bucketItems.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <section className="relative bg-black text-white py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
            THE BUCKET LIST
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-4">
            The Things I&apos;ll Do
          </h2>
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic bg-gradient-to-r from-[var(--color-8)] via-[var(--color-9)] to-[var(--color-8)] bg-clip-text text-transparent">
            Before I&apos;m Done
          </h3>

          {/* Progress Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>{completedCount} completed</span>
              <span>{totalCount} total</span>
            </div>
            <div className="h-2 bg-[var(--color-3)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[var(--color-8)] to-[var(--color-9)] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Bucket List Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {bucketItems.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "group relative p-4 sm:p-5 rounded-xl border transition-all duration-300 animate-in fade-in slide-in-from-bottom-4",
                item.completed 
                  ? "bg-zinc-900/50 border-[var(--color-8)]/50" 
                  : "bg-zinc-900/50 border-white/10 hover:border-white/30 hover:bg-zinc-800/50"
              )}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'both',
              }}
            >
              {/* Glow effect on hover */}
              {/* <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--color-8)]/0 to-[var(--color-9)]/0 group-hover:from-[var(--color-8)]/5 group-hover:to-[var(--color-9)]/5 transition-all duration-300 pointer-events-none"></div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--color-8)]/0 to-[var(--color-9)]/0 group-hover:from-[var(--color-8)]/5 group-hover:to-[var(--color-9)]/5 transition-all duration-300 pointer-events-none"></div> */}

              <div className="relative flex items-start gap-4">
                {/* Custom Checkbox - Display Only */}
                <div
                  className={cn(
                    "flex-shrink-0 mt-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded border-2 transition-all duration-300 relative overflow-hidden",
                    item.completed
                      ? "bg-gradient-to-br from-[var(--color-8)] to-[var(--color-9)] border-[var(--color-8)]"
                      : "border-[var(--color-6)]"
                  )}
                >
                  {/* Checkmark */}
                  <svg
                    className={cn(
                      "absolute inset-0 w-full h-full p-0.5 text-white transition-all duration-300",
                      item.completed ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-base sm:text-lg font-medium transition-all duration-300",
                      item.completed
                        ? "text-gray-400 line-through"
                        : "text-white group-hover:text-[var(--color-9)]"
                    )}
                  >
                    {item.text}
                  </p>
                  
                  {/* Date or Link */}
                  {(item.date || item.link) && (
                    <div className="mt-2 text-xs sm:text-sm">
                      {item.date && (
                        <span className="text-[var(--color-8)] font-medium">
                          {item.date}
                        </span>
                      )}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-8)] hover:text-[var(--color-9)] transition-colors inline-flex items-center gap-1 mt-1"
                        >
                          <span className="truncate max-w-[200px]">{item.link}</span>
                          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Item Number */}
              <div className={cn(
                "absolute top-2 right-2 text-xs font-mono opacity-20 group-hover:opacity-40 transition-opacity",
                item.completed && "opacity-10"
              )}>
                {String(item.id).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm sm:text-base italic">
            {completedCount === totalCount 
              ? "🎉 All goals achieved! Time to dream bigger." 
              : "One step at a time, one dream at a time."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BucketList;
