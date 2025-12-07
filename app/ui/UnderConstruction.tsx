"use client";
import React from 'react';
import { IconTool, IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

const UnderConstruction = () => {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-white/10 mb-8">
          <IconTool className="w-10 h-10 text-gray-400" stroke={1.5} />
        </div>
        
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-6 text-white">
          Under Development
        </h1>
        
        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-400 mb-12 leading-relaxed">
          This section is currently being crafted with attention to detail. 
          <br className="hidden sm:block" />
          Check back soon for something amazing.
        </p>
        
        {/* Divider */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent mx-auto mb-12" />
        
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-gray-300 hover:text-white transition-all duration-300 group"
        >
          <IconArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="font-medium">Back to Home</span>
        </Link>
        
        {/* Status indicator */}
        <div className="mt-16 flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
          <span>In Progress</span>
        </div>
      </div>
    </section>
  );
};

export default UnderConstruction;