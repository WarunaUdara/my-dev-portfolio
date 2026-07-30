"use client";
import React from "react";
import { cn } from "@/lib/utils";
import AuroraText from "@/components/ui/aurora-text";
import HandDrawnCheckbox from "@/components/ui/HandDrawnCheckbox";
import ScrollFrost from "@/components/canvasui/ScrollFrost";

interface BucketItem {
  id: number;
  text: string;
  completed: boolean;
  date?: string;
  note?: string;
  link?: string;
  progressRatio?: number;
}

const bucketItems: BucketItem[] = [
  { id: 1, text: "Skydiving", completed: false },
  { id: 2, text: "Find my first job", completed: false },
  { id: 3, text: "Solo travel to another country", completed: true },
  { id: 4, text: "Create portfolio website", completed: true, link: "https://warunadev.vercel.app/" },
  { id: 5, text: "Certified Kubernetes Administrator (CKA)", completed: false },
  {
    id: 6,
    text: "Parents trip to India",
    completed: false,
    date: "Half done ✈️",
    note: "Planning & initial travel arrangements in progress.",
  },
  { id: 7, text: "Remote working with client from abroad", completed: false },
  { id: 8, text: "Certified AWS Solutions Architect Associate", completed: false, date: "2026" },
  { id: 9, text: "Write 10 technical articles", completed: false, date: "9/10 done" },
  { id: 10, text: "Get 1,000 organic LinkedIn followers", completed: true, date: "May 2023" },
  { id: 11, text: "Organize or co-host a tech event", completed: true },
  { id: 12, text: "University degree", completed: true },
  { id: 13, text: "Sport car", completed: false },
  { id: 14, text: "Hike a mountain", completed: true },
  {
    id: 15,
    text: "Do 10 CSR activities",
    completed: false,
    date: "5/10 done | 1 pending",
  },
  { id: 16, text: "Teach coding to 100 students", completed: true },
  { id: 17, text: "Speak in front of 100 people", completed: true },
  {
    id: 18,
    text: "Speak in front of 1,000 people",
    completed: false,
    date: "700/1,000 done",
    progressRatio: 0.7,
    note: "Spoken to 700+ attendees across tech sessions, workshops & keynotes.",
  },
  { id: 19, text: "Solo hike", completed: false },
  { id: 20, text: "Participate in hackathons", completed: true },
  { id: 21, text: "First client project", completed: true },
  {
    id: 22,
    text: "Go pure vegetarian",
    completed: true,
    date: "2021",
    note: "No meat, no eggs. No exceptions, no 'just this once.' Years in and don't miss it.",
  },
  {
    id: 23,
    text: "Hit the gym consistently for a year",
    completed: false,
    note: "Started lifting, did 6 months, fell off, started again.",
  },
  {
    id: 24,
    text: "Learn Karate",
    completed: true,
    date: "5 years",
    note: "Stayed consistent and earned the black belt.",
  },
  {
    id: 25,
    text: "Meditate for 30 consecutive days",
    completed: false,
    note: "Longest streak: 9 days.",
  },
  { id: 26, text: "AZ-104: Microsoft Azure Administrator Associate", completed: false, date: "2026" },
  { id: 27, text: "AWS Certified AI Practitioner", completed: false, date: "2026" },
  { id: 28, text: "AWS Certified Cloud Practitioner", completed: false, date: "2026" },
  { id: 29, text: "Speed boat ride", completed: true, date: "Done 🚤" },
  {
    id: 30,
    text: "Build a homelab with self-hosted K8s cluster",
    completed: false,
    note: "Dedicated home lab server with Kubernetes cluster automation.",
  },
];

const BucketList = () => {
  const completedCount = bucketItems.filter((item) => item.completed).length;
  const totalCount = bucketItems.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <section className="relative bg-black text-white py-20 px-4 sm:px-6 overflow-hidden">
      <ScrollFrost height="h-[500px]" />
      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-400 mb-4 font-mono font-semibold">
            THE BUCKET LIST
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-4">
            The Things I&apos;ll Do
          </h2>
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif">
            <AuroraText className="italic font-serif">
              Before I&apos;m Done
            </AuroraText>
          </h3>

          {/* Progress Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-400 mb-2 font-mono">
              <span>{completedCount} completed</span>
              <span>{totalCount} total</span>
            </div>
            <div className="h-2 bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neutral-400 to-white transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bucket List Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {bucketItems.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "group relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 shadow-xl backdrop-blur-xl",
                item.completed
                  ? "bg-black/90 border-neutral-800/80 shadow-md"
                  : "bg-black/90 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-950/90"
              )}
              style={{
                animationDelay: `${index * 40}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="relative flex items-start gap-4">
                {/* Hand-Drawn Custom Checkbox Component */}
                <HandDrawnCheckbox checked={item.completed} size={28} className="mt-0.5 shrink-0" />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-base sm:text-lg font-medium transition-all duration-300 font-sans",
                      item.completed
                        ? "text-neutral-400 line-through"
                        : "text-white group-hover:text-neutral-200"
                    )}
                  >
                    {item.text}
                  </p>

                  {/* Visual Progress Bar for items like Speak to 1000 people */}
                  {item.progressRatio !== undefined && (
                    <div className="mt-3 max-w-xs space-y-1">
                      <div className="flex justify-between text-xs text-neutral-400 font-mono">
                        <span>Progress</span>
                        <span className="text-white font-semibold">{Math.round(item.progressRatio * 100)}% ({item.date})</span>
                      </div>
                      <div className="h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                        <div
                          className="h-full bg-gradient-to-r from-neutral-400 via-neutral-200 to-white transition-all duration-500"
                          style={{ width: `${item.progressRatio * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Date, Note, or Link */}
                  {(item.date || item.note || item.link) && item.progressRatio === undefined && (
                    <div className="mt-2 text-xs sm:text-sm">
                      {item.date && (
                        <span className="inline-block text-neutral-300 font-mono font-medium bg-neutral-900/90 px-2 py-0.5 rounded border border-neutral-800/80">
                          {item.date}
                        </span>
                      )}
                      {item.note && (
                        <p className="mt-1.5 text-neutral-400 leading-relaxed font-sans">
                          {item.note}
                        </p>
                      )}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1 mt-1 underline underline-offset-4 font-mono text-xs"
                        >
                          <span className="truncate max-w-[200px]">{item.link}</span>
                          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Note when progressRatio is defined */}
                  {item.note && item.progressRatio !== undefined && (
                    <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                      {item.note}
                    </p>
                  )}
                </div>
              </div>

              {/* Item Number */}
              <div
                className={cn(
                  "absolute top-2.5 right-3 text-xs font-mono opacity-25 group-hover:opacity-50 transition-opacity",
                  item.completed && "opacity-15"
                )}
              >
                {String(item.id).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm sm:text-base italic font-sans">
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
